let HomeComponent = function(
    $state,
    $rootScope,
    $timeout,
    CredentialsService,
    IdentityService,
    AuthService,
    appConfigs
) {
    let $ctrl = this;
    let qrCodeEl = document.getElementById('qrcode');

    let $redirectAuthorizedState = 'organizations';

    if (appConfigs.panel_type == 'validator') {
        $redirectAuthorizedState = 'csv-validation';
    }

    if (AuthService.hasCredentials()) {
        return $state.go($redirectAuthorizedState);
    }

    $ctrl.showModal = false;

    $ctrl.checkAccessTokenStatus = (type, access_token) => {
        IdentityService.checkAccessToken(access_token).then(() => {
            CredentialsService.set(access_token);
            $rootScope.loadAuthUser();
            $state.go($redirectAuthorizedState);
        }, function() {
            $timeout(function() {
                $ctrl.checkAccessTokenStatus(type, access_token);
            }, 2500);
        });
    };

    $ctrl.requestAuthToken = () => {
        IdentityService.makeAuthToken().then((res) => {
            $ctrl.authToken = res.data.auth_token;

            new QRCode(qrCodeEl, {
                text: JSON.stringify({
                    type: 'auth_token',
                    'value': $ctrl.authToken
                }),
                correctLevel: QRCode.CorrectLevel.L
            });

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

module.exports = {
    bindings: {},
    controller: [
        '$state',
        '$rootScope',
        '$timeout',
        'CredentialsService',
        'IdentityService',
        'AuthService',
        'appConfigs',
        HomeComponent
    ],
    templateUrl: 'assets/tpl/pages/home.html'
};