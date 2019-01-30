let OfficesEditComponent = function(
    $state,
    $stateParams,
    OfficeService,
    MediaService,
    FormBuilderService
) {
    let $ctrl = this;
    let mediaFile = false;

    $ctrl.media;

    $ctrl.$onInit = function() {
        let values = OfficeService.apiResourceToForm(
            $ctrl.office || {}
        );

        $ctrl.form = FormBuilderService.build(values, async (form) => {
            form.lock();

            let promise;

            if (mediaFile) {
                let res = await MediaService.store('office_photo', mediaFile);

                $ctrl.media = res.data.data;
                $ctrl.form.values.media_uid = $ctrl.media.uid;

                mediaFile = false;
            }

            if ($ctrl.office) {
                promise = OfficeService.update(
                    $stateParams.organization_id,
                    $stateParams.id,
                    form.values
                )
            } else {
                promise = OfficeService.store(
                    $stateParams.organization_id,
                    form.values
                )
            }

            promise.then((res) => {
                $state.go('offices', {
                    organization_id: $stateParams.organization_id
                });
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

    $ctrl.selectPhoto = (file) => {
        mediaFile = file;
    };

    $ctrl.cancel = function() {
        $state.go('offices', {
            'organization_id': $stateParams.organization_id
        });
    };
};

module.exports = {
    bindings: {
        office: '<'
    },
    controller: [
        '$state',
        '$stateParams',
        'OfficeService',
        'MediaService',
        'FormBuilderService',
        OfficesEditComponent
    ],
    templateUrl: 'assets/tpl/pages/offices-edit.html'
};