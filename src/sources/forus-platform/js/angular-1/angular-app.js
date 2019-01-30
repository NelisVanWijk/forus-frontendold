let app = angular.module('forusApp', ['ui.router', 'pascalprecht.translate', 'ngCookies', 'uiCropper']);

app.constant('appConfigs', env_data);

// Controllers
app.controller('BaseController', require('./controllers/BaseController'));

// Components
app.component('homeComponent', require('./components/HomeComponent'));
app.component('organizationsComponent', require('./components/OrganizationsComponent'));
app.component('organizationsEditComponent', require('./components/OrganizationsEditComponent'));
app.component('fundsMyComponent', require('./components/FundsMyComponent'));
app.component('providerFundsComponent', require('./components/ProviderFundsComponent'));
app.component('fundsEditComponent', require('./components/FundsEditComponent'));
app.component('fundsShowComponent', require('./components/FundsShowComponent'));
app.component('transactionsComponent', require('./components/TransactionsComponent'));
app.component('officesComponent', require('./components/OfficesComponent'));
app.component('officesEditComponent', require('./components/OfficesEditComponent'));
app.component('productsComponent', require('./components/ProductsComponent'));
app.component('productsEditComponent', require('./components/ProductsEditComponent'));
app.component('productsShowComponent', require('./components/ProductsShowComponent'));
app.component('organizationProvidersComponent', require('./components/OrganizationProvidersComponent'));
app.component('organizationValidatorsComponent', require('./components/OrganizationValidatorsComponent'));
app.component('organizationEmployeesComponent', require('./components/OrganizationEmployeesComponent'));
app.component('organizationValidatorsEditComponent', require('./components/OrganizationValidatorsEditComponent'));
app.component('csvValidationComonent', require('./components/CsvValidationComonent'));
app.component('validationRequestsComonent', require('./components/ValidationRequestsComonent'));
app.component('validationRequestComonent', require('./components/ValidationRequestComonent'));
app.component('signUpComponent', require('./components/SignUpComponent'));
app.component('financialDashboardComponent', require('./components/FinancialDashboardComponent'));
app.component('transactionComponent', require('./components/TransactionComponent'));

app.component('noPermissionComponent', require('./components/NoPermissionComonent'));

// Modal Components
app.component('modalPhotoUploaderComponent', require('./components/Modals/ModalPhotoUploaderComponent'));
app.component('modalFundTopUpComponent', require('./components/Modals/ModalFundTopUpComponent'));
app.component('modalEmployeeEditComponent', require('./components/Modals/ModalEmployeeEditComponent'));
app.component('modalNotificationComponent', require('./components/Modals/ModalNotificationComponent'));

// Services
app.service('AuthService', require('./services/AuthService'));
app.service('OrganizationService', require('./services/OrganizationService'));
app.service('TransactionService', require('./services/TransactionService'));
app.service('FundService', require('./services/FundService'));
app.service('CredentialsService', require('./services/CredentialsService'));
app.service('FormBuilderService', require('./services/FormBuilderService'));
app.service('IdentityService', require('./services/IdentityService'));
app.service('RecordService', require('./services/RecordService'));
app.service('RecordTypeService', require('./services/RecordTypeService'));
app.service('RecordCategoryService', require('./services/RecordCategoryService'));
app.service('RecordValidationService', require('./services/RecordValidationService'));
app.service('QrScannerService', require('./services/QrScannerService'));
app.service('ProductCategoryService', require('./services/ProductCategoryService'));
app.service('OfficeService', require('./services/OfficeService'));
app.service('ProductService', require('./services/ProductService'));
app.service('ProviderFundService', require('./services/ProviderFundService'));
app.service('OrganizationValidatorService', require('./services/OrganizationValidatorService'));
app.service('OrganizationEmployeesService', require('./services/OrganizationEmployeesService'));
app.service('PrevalidationService', require('./services/PrevalidationService'));
app.service('ProgressFakerService', require('./services/ProgressFakerService'));
app.service('ValidatorRequestService', require('./services/ValidatorRequestService'));
app.service('MediaService', require('./services/MediaService'));
app.service('ProviderIdentityService', require('./services/ProviderIdentityService'));
app.service('ConfigService', require('./services/ConfigService'));
app.service('ImageConvertorService', require('./services/ImageConvertorService'));
app.service('ModalService', require('./services/ModalService'));
app.service('PermissionsService', require('./services/PermissionsService'));
app.service('RoleService', require('./services/RoleService'));
app.service('SmsService', require('./services/SmsService'));

// Directives
switch (env_data.panel_type) {
    case 'sponsor':
        {
            app.directive('menu', require('./directives/MenuSponsorDirective'));
        };
        break;
    case 'provider':
        {
            app.directive('menu', require('./directives/MenuProviderDirective'));
        };
        break;
    case 'validator':
        {
            app.directive('menu', require('./directives/MenuValidatorDirective'));
        };
        break;
}

app.directive('fundCardSponsor', require('./directives/FundCardSponsorDirective'));
app.directive('fundCardProvider', require('./directives/FundCardProviderDirective'));
app.directive('fundCardProviderFinances', require('./directives/FundCardProviderFinancesDirective'));
app.directive('fundCardAvailableProvider', require('./directives/FundCardAvailableProviderDirective'));
app.directive('fundCardProviderCanJoin', require('./directives/FundCardProviderCanJoinDirective'));
app.directive('productCard', require('./directives/ProductCardDirective'));
app.directive('multiSelect', require('./directives/MultiSelectDirective'));
app.directive('scheduleControl', require('./directives/ScheduleControlDirective.js'));
app.directive('csvUpload', require('./directives/CsvUploadDirective'));
app.directive('progressBar', require('./directives/ProgressBarDirective'));
app.directive('prevalidatedTable', require('./directives/PrevalidatedTableDirective'));
app.directive('photoSelector', require('./directives/PhotoSelectorDirective'));
app.directive('radialChart', require('./directives/RadialChartDirective'));
app.directive('linearChart', require('./directives/LinearChartDirective'));
app.directive('popupAuth', require('./directives/PopupAuthDirective'));
app.directive('collapse', require('./directives/CollpaseDirective'));
app.directive('landingNavbar', require('./directives/landing/NavbarDirective'));
app.directive('landingContactForm', require('./directives/landing/ContactFormDirective'));
app.directive('forusChat', require('./directives/ForusChatDirective'));
app.directive('pincodeControl', require('./directives/PincodeControlDirective'));
app.directive('productCategoriesControl', require('./directives/ProductCategoriesControlDirective'));
app.directive('officeEditInline', require('./directives/OfficeEditInlineDirective'));
app.directive('tooltip', require('./directives/TooltipDirective'));
app.directive('informationBlock', require('./directives/InformationBlockDirective'));
app.directive('menuScrollToggle', require('./directives/landing/MenuScrollToggleDirective'));
app.directive('phoneControl', require('./directives/PhoneControlDirective'));

app.directive('paginator', require('./directives/paginators/PaginatorDirective'));
app.directive('paginatorLoader', require('./directives/paginators/PaginatorLoaderDirective'));

app.directive('modalsRoot', require('./directives/modals/ModalsRootDirective'));
app.directive('modalItem', require('./directives/modals/ModalItemDirective'));
app.directive('modalScrollBraker', require('./directives/modals/ModalScrollBrakerDirective'));

app.directive('blockEmpty', require('./directives/blocks/BlockEmptyDirective'));
app.directive('blockNoPermission', require('./directives/blocks/BlockNoPermissionDirective'));

// Providers
app.provider('ApiRequest', require('./providers/ApiRequestProvider'));
app.provider('ModalRoute', require('./providers/ModalRouteProvider'));

// Filters
app.filter('pretty_json', require('./filters/PrettyJsonFilter'));
app.filter('to_fixed', require('./filters/ToFixedFilter'));
app.filter('file_size', require('./filters/FileSizeFilter'));
app.filter('hasPerm', require('./filters/HasPerm'));

// Config
app.config(require('./routers/modals'));
app.config(require('./routers/router'));
app.config(require('./config/api-service'));
app.config(require('./config/i18n'));

app.run(require('./routers/router-transitions'));

// Bootstrap the app
angular.bootstrap(document.querySelector('html'), ['forusApp', '720kb.datepicker']);

if (!env_data.html5ModeEnabled) {
    let hash = document.location.hash;

    if (hash.length > 3 && hash[hash.length - 1] == '/') {
        document.location.hash = hash.slice(0, hash.length - 1);
    } else if (hash.length < 3) {
        document.location.hash = '#!/';
    }
}

module.exports = app;