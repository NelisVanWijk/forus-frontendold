let VouchersComponent = function(
    $state,
    $rootScope,
    $timeout,
    CredentialsService,
    IdentityService,
    AuthService,
    appConfigs
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        
    };
};

module.exports = {
    bindings: {
        vouchers: '<'
    },
    controller: [
        '$state',
        '$rootScope',
        '$timeout',
        'CredentialsService',
        'IdentityService',
        'AuthService',
        'appConfigs',
        VouchersComponent
    ],
    templateUrl: 'assets/tpl/pages/vouchers.html'
};