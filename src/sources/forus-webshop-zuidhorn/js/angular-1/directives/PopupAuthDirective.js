let PopupAuthDirective = function(
    $element,
    $filter,
    $state,
    $scope,
    $timeout,
    $rootScope,
    AuthService,
    IdentityService,
    FormBuilderService,
    PrevalidationService,
    CredentialsService,
    ConfigService,
    FundService,
    appConfigs
) {
    $scope.$watch('popup.screen', function(newValue) {
        if (newValue == 'sign_in-qr') {
            $ctrl.requestAuthQrToken();
        }

        if (newValue == 'activate-code') {
            $scope.activateCodeForm = FormBuilderService.build({
                code: "",
            }, function(form) {
                if (!form.values.code) {
                    form.errors.code = true;
                    return;
                }

                form.lock();

                PrevalidationService.redeem(form.values.code).then((res) => {
                    $scope.popup.close();

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
                }, (res) => {
                    form.errors.code = true
                    form.unlock();
                });
            });
        }

        if (newValue == 'sign_up-code') {
            $scope.signUpForm = FormBuilderService.build({
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
                        $scope.popup.close();

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
        }

        if (newValue == 'sign_in-email') {
            $scope.signInEmailForm = FormBuilderService.build({
                source: appConfigs.client_key + '_webshop',
                primary_email: "",
            }, function(form) {
                form.lock();

                IdentityService.makeAuthEmailToken(
                    form.values.source,
                    form.values.primary_email
                ).then((res) => {
                    localStorage.setItem('pending_email_token', res.data.access_token);
                    $scope.popup.open('sign_in-email-sent');
                }, (res) => {
                    form.unlock();
                    form.errors = res.data.errors;
                });
            });
        }

        if (newValue == 'sign_in-email-sent') {
            // no actions required
        }

        if (newValue == 'voucher-email-sent') {
            // no actions required
        }

        if (newValue == 'authorize-pin_code') {
            $scope.authorizePincodeForm = FormBuilderService.build({
                auth_code: "",
            }, function(form) {
                form.lock();

                IdentityService.authorizeAuthCode(
                    form.values.auth_code
                ).then((res) => {
                    $scope.popup.open('authorize-pin_code-done');
                }, (res) => {
                    form.unlock();
                    form.errors = res.data.errors;

                    if (res.status == 404) {
                        form.errors = {
                            auth_code: ["Unknown code."]
                        };
                    }
                });
            });
        }
    });

    let $ctrl = this;
    let qrCodeEl;
    let qrCode;

    this.$onInit = function() {
        qrCodeEl = document.getElementById('auth_qrcode');
        qrCode = new QRCode(qrCodeEl, {
            correctLevel: QRCode.CorrectLevel.L
        });

        $(document).bind('keydown', (e) => {
            $timeout(function() {
                var key = e.charCode || e.keyCode || 0;

                if (key == 27) {
                    $scope.popup.close();
                }
            }, 0);
        });
    }


    if (AuthService.hasCredentials()) {
        $scope.popup.close();
    }

    $ctrl.showModal = false;

    $ctrl.applyAccessToken = function(access_token) {
        CredentialsService.set(access_token);
        $rootScope.loadAuthUser();
        $scope.popup.close();
    };

    $ctrl.checkAccessTokenStatus = (type, access_token) => {
        IdentityService.checkAccessToken(access_token).then((res) => {
            if (res.data.message == 'active') {
                $ctrl.applyAccessToken(access_token);
            } else if (res.data.message == 'pending') {
                $timeout(function() {
                    $ctrl.checkAccessTokenStatus(type, access_token);
                }, 2500);
            } else {
                document.location.reload();
            }
        });
    };

    $ctrl.requestAuthQrToken = () => {
        IdentityService.makeAuthToken().then((res) => {
            $ctrl.authToken = res.data.auth_token;

            qrCode.makeCode(
                JSON.stringify({
                    type: 'auth_token',
                    'value': $ctrl.authToken
                })
            );

            qrCodeEl.removeAttribute('title');

            $ctrl.showModal = true;

            $ctrl.checkAccessTokenStatus('token', res.data.access_token);
        }, console.log);
    };

    $ctrl.closeModal = function() {
        $ctrl.showModal = false;
        qrCodeEl.innerHTML = '';
    };
};

module.exports = () => {
    return {
        scope: {
            popup: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$element',
            '$filter',
            '$state',
            '$scope',
            '$timeout',
            '$rootScope',
            'AuthService',
            'IdentityService',
            'FormBuilderService',
            'PrevalidationService',
            'CredentialsService',
            'ConfigService',
            'FundService',
            'appConfigs',
            PopupAuthDirective
        ],
        templateUrl: 'assets/tpl/directives/popup-auth.html'
    };
};