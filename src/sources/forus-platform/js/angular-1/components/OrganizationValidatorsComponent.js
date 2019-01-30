let OrganizationValidatorsComponent = function(
    $state,
    $stateParams,
    OrganizationValidatorService
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.emptyBlockLink = $state.href('validators-create', $stateParams);
    };

    $ctrl.deleteValidator = function(e, validator) {
        e.preventDefault() & e.stopPropagation();

        OrganizationValidatorService.destroy(
            validator.organization_id,
            validator.id
        ).then((res) => {
            $state.reload();
        }, console.error);
    }
};

module.exports = {
    bindings: {
        validators: '<'
    },
    controller: [
        '$state',
        '$stateParams',
        'OrganizationValidatorService',
        OrganizationValidatorsComponent
    ],
    templateUrl: 'assets/tpl/pages/organization-validators.html'
};