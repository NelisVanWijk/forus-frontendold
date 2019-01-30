let HomeComponent = function(
    $state, 
    $rootScope, 
    $timeout, 
    CredentialsService, 
    IdentityService,
    appConfigs
) {
    let $ctrl = this;
    let qrCodeEl = document.getElementById('qrcode');

    let $redirectAuthorizedState = 'organizations';

    if (appConfigs.panel_type == 'validator') {
        $redirectAuthorizedState = 'csv-validation';
    }

    $ctrl.showModal = false;

    $ctrl.checkAccessTokenStatus = (type, access_token) => {
        IdentityService.checkAccessToken(access_token).then((res) => {
            if (res.data.message == 'active') {
                CredentialsService.set(access_token);
                $rootScope.loadAuthUser();
                $state.go($redirectAuthorizedState);
            } else if (res.data.message == 'pending') {
                $timeout(function() {
                    $ctrl.checkAccessTokenStatus(type, access_token);
                }, 2500);
            } else {
                document.location.reload();
            }
        });
    };

    $ctrl.requestAuthToken = () => {
        IdentityService.makeAuthToken().then((res) => {
            $ctrl.authToken = res.data.auth_token;

            new QRCode(qrCodeEl, {
                text: JSON.stringify({
                    type: 'auth_token',
                    value: $ctrl.authToken
                }),
                correctLevel: QRCode.CorrectLevel.L,
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
    controller: [
        '$state', 
        '$rootScope', 
        '$timeout', 
        'CredentialsService', 
        'IdentityService',
        'appConfigs', 
        HomeComponent
    ],
    templateUrl: (appConfigs) => {
        if (appConfigs.panel_type == 'validator') {
            return 'assets/tpl/pages/home.html';
        }
        if (appConfigs.panel_type == 'provider'  && appConfigs.client_key == 'nijmegen'){
            return 'assets/tpl/pages/landing/home-' + appConfigs.panel_type + '-'+ appConfigs.client_key +'.html';
        }
        if (appConfigs.panel_type == 'sponsor' && appConfigs.client_key == 'nijmegen'){
            return 'assets/tpl/pages/landing/home-' + appConfigs.panel_type + '-'+ appConfigs.client_key +'.html';
        }
        return 'assets/tpl/pages/landing/home-' + appConfigs.panel_type + '.html';
    }
};