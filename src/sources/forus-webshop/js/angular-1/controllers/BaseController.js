let BaseController = function(
    $rootScope,
    $scope,
    $state,
    IdentityService,
    AuthService,
    CredentialsService,
    RecordService,
    OrganizationService,
    ConfigService,
    $translate,
    $filter,
    appConfigs
) {
    $rootScope.loadAuthUser = function() {
        AuthService.identity().then((res) => {
            let auth_user = res.data;

            RecordService.list().then((res) => {
                auth_user.records = res.data;
                auth_user.primary_email = res.data.filter((record) => {
                    return record.key == 'primary_email';
                })[0].value;
            });

            OrganizationService.list().then((res) => {
                auth_user.organizations = res.data.data;
                auth_user.organizationsMap = {};
                auth_user.organizationsIds = Object.values(res.data.data).map(function(organization) {
                    auth_user.organizationsMap[organization.id] = organization;
                    return organization.id;
                });
            });

            $rootScope.auth_user = auth_user;
        });
    };

    $rootScope.$on('organization-changed', (event) => {
        $rootScope.activeOrganization = OrganizationService.active();
    });

    $rootScope.$on('auth:update', (event) => {
        $rootScope.loadAuthUser();
    });

    $rootScope.activeOrganization = OrganizationService.active();

    $rootScope.signOut = () => {
        AuthService.signOut();
        $state.go('home');
        $rootScope.auth_user = false;
    };

    $rootScope.appConfigs = appConfigs;

    $rootScope.i18nLangs = $translate.getAvailableLanguageKeys();
    $rootScope.i18nActive = $translate.use();

    $rootScope.setLang = (lang) => {
        $translate.use(lang);
        $rootScope.i18nActive = $translate.use();
    };

    if (AuthService.hasCredentials()) {
        $rootScope.loadAuthUser();
    }

    ConfigService.get('webshop').then((res) => {
        $rootScope.appConfigs.features = res.data;
    });

    $rootScope.pageTitle = $filter('translate')('page_title');
};

module.exports = [
    '$rootScope',
    '$scope',
    '$state',
    'IdentityService',
    'AuthService',
    'CredentialsService',
    'RecordService',
    'OrganizationService',
    'ConfigService',
    '$translate',
    '$filter',
    'appConfigs',
    BaseController
];