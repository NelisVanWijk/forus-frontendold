let OfficeEditInlineDirective = function(
    FormBuilderService,
    OfficeService,
    MediaService,
    $timeout,
    $scope
) {
    let $ctrl = {
        media: false
    };
    
    let init = false;
    let timeout;
    let mediaFile = false;

    $ctrl.office = $scope.office;
    
    $ctrl.selectPhoto = (file) => {
        mediaFile = file;
        $ctrl.form.submit();
    };

    $scope.$watch('$ctrl.form.values', function(_new, _old) {
        if (!init) {
            return init = true;
        }

        if (_new.media_uid != _old.media_uid) {
            return;
        }

        if (timeout) {
            $timeout.cancel(timeout);
        }

        timeout = $timeout(() => {
            $ctrl.form.submit();
            timeout = false;
        }, 1000);
    }, true);

    $ctrl.$onInit = function() {
        let values = OfficeService.apiResourceToForm(
            $scope.office || {}
        );

        $ctrl.form = FormBuilderService.build(values, async (form) => {
            form.lock();

            let promise;

            if (mediaFile) {
                let res = await MediaService.store('office_photo', mediaFile);

                $ctrl.media = res.data.data;
                $ctrl.form.values.media_uid = $ctrl.media.uid;
                
                mediaFile = false;
            } else {
                delete $ctrl.form.values.media_uid;
            }

            if ($ctrl.office) {
                promise = OfficeService.update(
                    $scope.organizationId,
                    $ctrl.office.id,
                    form.values
                )
            } else {
                promise = OfficeService.store(
                    $scope.organizationId,
                    form.values
                )
            }

            promise.then((res) => {
                $ctrl.saved = true;
                form.unlock();
                
                if (!$ctrl.office) {
                    $ctrl.office = $scope.office = res.data.data
                }

                $timeout(() => {
                    $ctrl.saved = false;
                }, 2000);
            }, (res) => {
                form.errors = res.data.errors;
                form.unlock();
            });
        });

        if ($ctrl.office && $ctrl.office.photo) {
            MediaService.read($ctrl.office.photo.uid).then((res) => {
                $ctrl.media = res.data.data;
            });
        }
    };

    $ctrl.$onInit();

    $scope.$ctrl = $ctrl;
};

module.exports = () => {
    return {
        scope: {
            office: "=",
            organizationId: "=",
        },
        restrict: "EA",
        controller: [
            'FormBuilderService',
            'OfficeService',
            'MediaService',
            '$timeout',
            '$scope',
            OfficeEditInlineDirective
        ],
        replace: true,
        templateUrl: 'assets/tpl/directives/office-edit-inline.html'
    };
};