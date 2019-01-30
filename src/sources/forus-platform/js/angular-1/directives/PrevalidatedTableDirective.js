let PrevalidatedTableDirective = async function(
    $scope,
    PrevalidationService
) {
    $scope.filter = {
        q: ''
    };

    $scope.$on('csv:uploaded', function() {
        $scope.onPageChange({
            page: 1
        });
    })

    $scope.onPageChange = async (query) => {
        PrevalidationService.list(query).then((res => {
            $scope.prevalidations = res.data;
        }));
    };

    $scope.onReset = async (query) => {
        PrevalidationService.list(query).then((res => {
            $scope.prevalidations = res.data;
        }));
    };

    $scope.onLoadMore = async (query) => {
        PrevalidationService.list(query).then((res => {
            $scope.prevalidations.data = $scope.prevalidations.data.concat(res.data.data);
            $scope.prevalidations.meta = res.data.meta;
        }));
    };

    // Export to CSV file
    $scope.exportList = function(e) {
        e && (e.preventDefault() & e.stopPropagation());

        PrevalidationService.list({
            per_page: 100000
        }).then((res => {
            var data = res.data.data.map(function(row) {
                let mapRow = {
                    "Code": row.uid
                };

                row.records.forEach(function(record) {
                    mapRow[record.name] = record.value;
                });

                return mapRow;
            });

            var file_name = 'forus-platform.csv';
            var file_type = 'text/csv;charset=utf-8;';
            var file_data = Papa.unparse(data);

            var blob = new Blob([file_data], {
                type: file_type,
            });

            saveAs(blob, file_name);
        }));
    };

    $scope.typesByKey = {};
    $scope.recordTypes.forEach(element => {
        $scope.typesByKey[element.key] = element.name;
    });
};

module.exports = () => {
    return {
        scope: {
            prevalidations: '=',
            recordTypes: '=',
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            'PrevalidationService',
            PrevalidatedTableDirective
        ],
        templateUrl: 'assets/tpl/directives/prevalidated-table.html' 
    };
};