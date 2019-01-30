let PopupAuthDirective = function(
    $element,
    $state,
    $scope,
    $timeout,
    $rootScope,
    AuthService,
    IdentityService,
    FormBuilderService,
    PrevalidationService,
    CredentialsService,
    FundService,
    appConfigs
) {
    $scope.$watch('popup.screen', function(newValue) {
        if (newValue == 'sign_in-qr') {
            $ctrl.requestAuthQrToken();
        }

        if (newValue == 'sign_in-email') {
            $scope.signInEmailForm = FormBuilderService.build({
                source: appConfigs.client_key + '_' + appConfigs.panel_type,
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
        $state.go('organizations');
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
            '$state',
            '$scope',
            '$timeout',
            '$rootScope',
            'AuthService',
            'IdentityService',
            'FormBuilderService',
            'PrevalidationService',
            'CredentialsService',
            'FundService',
            'appConfigs',
            PopupAuthDirective
        ],
        templateUrl: 'assets/tpl/directives/popup-auth.html'
    };
};