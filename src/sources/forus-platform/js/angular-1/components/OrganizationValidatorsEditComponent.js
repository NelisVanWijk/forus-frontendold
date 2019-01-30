let OrganizationValidatorsEditComponent = function(
    $state,
    $stateParams,
    OrganizationValidatorService,
    FormBuilderService
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        let values = OrganizationValidatorService.apiResourceToForm(
            $ctrl.validator || {}
        );

        $ctrl.form = FormBuilderService.build(values, (form) => {
            let promise;

            form.lock();

            if ($ctrl.validator) {
                promise = OrganizationValidatorService.update(
                    $stateParams.organization_id,
                    $stateParams.id,
                    form.values
                )
            } else {
                promise = OrganizationValidatorService.store(
                    $stateParams.organization_id,
                    form.values
                )
            }

            promise.then((res) => {
                $state.go('validators', {
                    organization_id: $stateParams.organization_id
                });
            }, (res) => {
                form.errors = res.data.errors;
                form.unlock();
            });
        });
    };

    $ctrl.cancel = function () {
        $state.go('validators', {'organization_id' : $stateParams.organization_id});
    };
};

module.exports = {
    bindings: {
        validator: '<'
    },
    controller: [
        '$state', 
        '$stateParams', 
        'OrganizationValidatorService', 
        'FormBuilderService', 
        OrganizationValidatorsEditComponent
    ],
    templateUrl: 'assets/tpl/pages/validators-edit.html'
};