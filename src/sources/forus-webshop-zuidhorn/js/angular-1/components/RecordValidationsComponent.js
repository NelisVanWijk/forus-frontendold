let RecordValidationsComponent = function(
    $state,
    $rootScope,
    $timeout,
    CredentialsService,
    IdentityService,
    AuthService,
    appConfigs
) {
    let $ctrl = this;

    $ctrl.recordsByTypesKey = {};

    $ctrl.$onInit = function() {
        $ctrl.recordTypes.forEach(function(recordType) {
            $ctrl.recordsByTypesKey[recordType.key] = recordType;
        });
    };
};

module.exports = {
    bindings: {
        record: '<',
        records: '<',
        recordTypes: '<'
    },
    controller: [
        '$state',
        '$rootScope',
        '$timeout',
        'CredentialsService',
        'IdentityService',
        'AuthService',
        'appConfigs',
        RecordValidationsComponent
    ],
    templateUrl: 'assets/tpl/pages/record-validations.html'
};