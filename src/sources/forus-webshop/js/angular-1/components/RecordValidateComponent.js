let RecordValidateComponent = function(
    $state,
    $rootScope,
    $timeout,
    CredentialsService,
    IdentityService,
    AuthService,
    ValidatorRequestService,
    appConfigs
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.validators = $ctrl.validators.map(function(validator) {
            validator.isPending = $ctrl.validationRequests.filter(request => {
                return (request.validator_id == validator.id) && (
                    request.state == 'pending'
                ) && (request.record_id == $ctrl.record.id);
            }).length > 0;

            return validator;
        });
    };

    $ctrl.requestValidation = (validator) => {
        ValidatorRequestService.requestValidation(
            validator.id,
            $ctrl.record.id
        ).then(res => {
            $state.reload();
        }, console.error);
    };
};

module.exports = {
    bindings: {
        record: '<',
        records: '<',
        validators: '<',
        validationRequests: '<',
        recordTypes: '<'
    },
    controller: [
        '$state',
        '$rootScope',
        '$timeout',
        'CredentialsService',
        'IdentityService',
        'AuthService',
        'ValidatorRequestService',
        'appConfigs',
        RecordValidateComponent
    ],
    templateUrl: 'assets/tpl/pages/record-validate.html'
};