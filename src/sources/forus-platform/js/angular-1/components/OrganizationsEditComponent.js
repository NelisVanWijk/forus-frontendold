let OrganizationsEditComponent = function(
    $state,
    $rootScope,
    $stateParams,
    OrganizationService,
    FormBuilderService,
    MediaService
) {
    let $ctrl = this;
    let mediaFile = false;

    $ctrl.$onInit = function() {
        let values;

        if (!$ctrl.organization) {
            OrganizationService.clearActive();
            values = {
                "product_categories": []
            };
        } else {
            values = OrganizationService.apiResourceToForm($ctrl.organization)
        };

        $ctrl.form = FormBuilderService.build(values, async (form) => {
            form.lock();

            let promise;
            let values = JSON.parse(JSON.stringify(form.values));

            if (typeof(values.iban) === 'string') {
                values.iban = values.iban.replace(/\s/g, '');
            }

            if (mediaFile) {
                let res = await MediaService.store('organization_logo', mediaFile);

                $ctrl.media = res.data.data;
                values.media_uid = $ctrl.media.uid;

                mediaFile = false;
            }

            if ($ctrl.organization) {
                promise = OrganizationService.update(
                    $stateParams.id,
                    values
                );
            } else {
                promise = OrganizationService.store(values);
            }

            promise.then((res) => {
                $state.go('organizations');
                $rootScope.$broadcast('auth:update');
            }, (res) => {
                form.errors = res.data.errors;
                form.unlock();
            });
        });

        if ($ctrl.organization && $ctrl.organization.logo) {
            MediaService.read($ctrl.organization.logo.uid).then((res) => {
                $ctrl.media = res.data.data;
            });
        }
    };

    $ctrl.selectPhoto = (file) => {
        mediaFile = file;
    };

    $ctrl.cancel = function() {
        if ($ctrl.organization)
            $state.go('offices', {
                'organization_id': $ctrl.organization.id
            });
        else
            $state.go('organizations');
    };
};

module.exports = {
    bindings: {
        organization: '<',
        productCategories: '<'
    },
    controller: [
        '$state',
        '$rootScope',
        '$stateParams',
        'OrganizationService',
        'FormBuilderService',
        'MediaService',
        OrganizationsEditComponent
    ],
    templateUrl: 'assets/tpl/pages/organizations-edit.html'
};