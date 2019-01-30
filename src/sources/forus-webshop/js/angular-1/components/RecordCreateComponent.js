let RecordCreateComponent = function(
    $state,
    $element,
    $rootScope,
    $timeout,
    CredentialsService,
    IdentityService,
    AuthService,
    ValidatorRequestService,
    RecordService,
    FormBuilderService,
    appConfigs
) {
    let $ctrl = this;

    $ctrl.recordsByTypesKey = {};

    $ctrl.$onInit = function() {
        $ctrl.step = 1;
        $ctrl.recordTypes.forEach(function(recordType) {
            $ctrl.recordsByTypesKey[recordType.key] = recordType;
        });
    };

    $ctrl.gotToStep = function(step) {
        $ctrl.step = step;
        $timeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    };

    $ctrl.form = FormBuilderService.build({}, function(form) {
        RecordService.store(form.values).then(res => {
            form.lock();
            $state.go('records');
        }, res => {
            form.unlock();
            form.errors = res.data.errors;
        });
    });
};

module.exports = {
    bindings: {
        recordTypes: '<'
    },
    controller: [
        '$state',
        '$element',
        '$rootScope',
        '$timeout',
        'CredentialsService',
        'IdentityService',
        'AuthService',
        'ValidatorRequestService',
        'RecordService',
        'FormBuilderService',
        'appConfigs',
        RecordCreateComponent
    ],
    templateUrl: 'assets/tpl/pages/record-create.html'
};