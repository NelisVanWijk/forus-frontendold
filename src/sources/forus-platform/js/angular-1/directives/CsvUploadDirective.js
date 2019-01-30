let CsvUploadDirective = function(
    $q,
    $scope,
    $rootScope,
    $element,
    $timeout,
    PrevalidationService,
    ProgressFakerService
) {
    let $ctrl = this;
    let csvParser = {};
    let input = false;
    let dataChunkSize = 100;

    let setProgress = function(progress) {
        $scope.progressBar = progress;

        if (progress < 100) {
            $scope.progressStatus = "Uploading...";
        } else {
            $scope.progressStatus = "Completed";
        }
    };

    $scope.progressBar = 0;
    $scope.progressStatus = "";

    let bind = function() {
        csvParser.selectFile = function(e) {
            e && (e.preventDefault() & e.stopPropagation());

            if (input && input.remove) {
                input.remove();
            }

            input = document.createElement('input');
            input.setAttribute("type", "file");
            input.style.display = 'none';

            input.addEventListener('change', function(e) {
                var target_file = this.files[0];

                new $q(function(resolve, reject) {
                    Papa.parse(target_file, {
                        complete: resolve
                    });
                }).then(function(results) {
                    var header = results.data[0];
                    var body = results.data.slice(1);
                    var bsnPos = header.indexOf('bsn');

                    if (bsnPos === -1) {
                        return alert("Bsn record is required.");
                    }

                    csvParser.data = body.map(function(val, key) {
                        let row = {};

                        header.forEach((hVal, hKey) => {
                            row[hVal] = val[hKey];
                        });

                        if ($scope.fundKey) {
                            row[$scope.fundKey + '_eligible'] = 'Ja';
                        }

                        return row;
                    });

                    csvParser.csvFile = target_file;
                    csvParser.progress = 1;
                    csvParser.isValid = csvParser.validateFile();
                }, console.log);
            });

            $element[0].appendChild(input);

            input.click();
        };

        csvParser.validateFile = function() {
            let invalidRows = csvParser.data.filter(row => {
                let keys = Object.keys(row);

                return keys.filter((key) => $scope.recordTypeKeys.indexOf(key) == -1).length > 0;
            });

            return invalidRows.length === 0;
        };

        let chunk = function(arr, len) {
            var chunks = [],
                i = 0,
                n = arr.length;

            while (i < n) {
                chunks.push(arr.slice(i, i += len));
            }

            return chunks;
        }

        csvParser.uploadToServer = function(e) {
            e && (e.preventDefault() & e.stopPropagation());

            if (!csvParser.isValid) {
                return false;
            }

            csvParser.progress = 2;

            var submitData = chunk(JSON.parse(JSON.stringify(
                csvParser.data
            )), dataChunkSize);

            var chunksCount = submitData.length;
            var currentChunkNth = 0;
            
            setProgress(0);

            let uploadChunk = function(data) {
                PrevalidationService.submitData(data).then(function() {
                    currentChunkNth++;
                    setProgress((currentChunkNth / chunksCount) * 100);

                    if (currentChunkNth == chunksCount) {
                        $timeout(function() {
                            csvParser.progressBar = 100;
                            csvParser.progress = 3;

                            $rootScope.$broadcast('csv:uploaded', true);
                        }, 0);
                    } else {
                        uploadChunk(submitData[currentChunkNth]);
                    }
                });
            };

            uploadChunk(submitData[currentChunkNth]);
        }
    };

    let init = function() {
        input = false;
        csvParser = {};
        csvParser.progress = 0;

        bind();

        $scope.recordTypeKeys = $scope.recordTypes.map(recordType => recordType.key);
        $scope.csvParser = csvParser;
    };

    init();

    $scope.reset = function() {
        init();
    };
};

module.exports = () => {
    return {
        scope: {
            text: '=',
            fundKey: '=',
            button: '=',
            recordTypes: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$q',
            '$scope',
            '$rootScope',
            '$element',
            '$timeout',
            'PrevalidationService',
            'ProgressFakerService',
            CsvUploadDirective
        ],
        templateUrl: 'assets/tpl/directives/csv-upload.html'
    };
};