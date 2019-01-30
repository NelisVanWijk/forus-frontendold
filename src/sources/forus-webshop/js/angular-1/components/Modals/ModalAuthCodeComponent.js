let ModalAuthComponent = function(
    $filter,
    $state,
    $rootScope,
    AuthService,
    IdentityService,
    FormBuilderService,
    PrevalidationService,
    CredentialsService,
    ConfigService,
    FundService
) {

    let $ctrl = this;

    $ctrl.$onInit = () => {

        $ctrl.signUpForm = FormBuilderService.build({
            code: "",
            pin_code: "1111",
        }, function(form) {
            if (form.values.records && (form.values.records.primary_email !=
                    form.values.records.primary_email_confirmation)) {
                form.errors = {
                    'records.primary_email_confirmation': [
                        $filter('translate')('validation.email_confirmation')
                    ]
                };
                return;
            }

            form.lock();

            IdentityService.make({
                code: form.values.code,
                pin_code: form.values.pin_code,
                records: {
                    primary_email: form.values.records ? form.values.records.primary_email : ''
                },
            }).then((res) => {
                $ctrl.applyAccessToken(res.data.access_token);

                PrevalidationService.redeem(
                    form.values.code
                ).then(function() {
                    $ctrl.close();

                    ConfigService.get().then((res) => {
                        if (!res.data.funds.list) {
                            FundService.applyToFirstAvailable().then(res => {
                                $state.go('voucher', res.data.data);
                            }, () => {
                                alert('Sorry no funds to apply to.');
                            });
                        } else if (res.data.records.list) {
                            $state.go('records');
                        } else {
                            $state.go('home');
                        }
                    });
                }, console.error);
            }, (res) => {
                form.unlock();
                form.errors = res.data.errors;
            });
        });
    };

    if (AuthService.hasCredentials()) {
        $ctrl.close();
    }

    $ctrl.applyAccessToken = function(access_token) {
        CredentialsService.set(access_token);
        $rootScope.loadAuthUser();
        $ctrl.close();
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$filter',
        '$state',
        '$rootScope',
        'AuthService',
        'IdentityService',
        'FormBuilderService',
        'PrevalidationService',
        'CredentialsService',
        'ConfigService',
        'FundService',
        ModalAuthComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-auth-code.html';
    }
};