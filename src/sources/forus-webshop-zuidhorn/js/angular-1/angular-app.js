let app = angular.module('forusApp', ['ui.router', 'pascalprecht.translate', 'ngCookies']);

app.constant('appConfigs', env_data);

// Controllers
app.controller('BaseController', require('./controllers/BaseController'));

// Components
app.component('homeComponent', require('./components/HomeComponent'));
app.component('fundsComponent', require('./components/FundsComponent'));
app.component('vouchersComponent', require('./components/VouchersComponent'));
app.component('recordsComponent', require('./components/RecordsComponent'));
app.component('productsComponent', require('./components/ProductsComponent'));
app.component('productComponent', require('./components/ProductComponent'));
app.component('productApplyComponent', require('./components/ProductApplyComponent'));
app.component('voucherComponent', require('./components/VoucherComponent'));
app.component('fundApplyComponent', require('./components/FundApplyComponent'));
app.component('recordValidateComponent', require('./components/RecordValidateComponent'));
app.component('recordValidationsComponent', require('./components/RecordValidationsComponent'));
app.component('recordCreateComponent', require('./components/RecordCreateComponent'));

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
app.service('PrevalidationService', require('./services/PrevalidationService'));
app.service('ProgressFakerService', require('./services/ProgressFakerService'));
app.service('ValidatorRequestService', require('./services/ValidatorRequestService'));
app.service('MediaService', require('./services/MediaService'));
app.service('VoucherService', require('./services/VoucherService'));
app.service('ValidatorService', require('./services/ValidatorService'));
app.service('GoogleMapService', require('./services/GoogleMapService'));
app.service('ConfigService', require('./services/ConfigService'));
app.service('ModalService', require('./services/ModalService'));

// Directives
app.directive('emptyBlock', require('./directives/EmptyBlockDirective'));
app.directive('topNavbar', require('./directives/TopNavbarDirective'));
app.directive('popupAuth', require('./directives/PopupAuthDirective'));
app.directive('popupOffices', require('./directives/PopupOfficesDirective'));
app.directive('contactForm', require('./directives/ContactFormDirective'));
app.directive('fundCriterion', require('./directives/FundCriterionDirective'));
app.directive('profileCard', require('./directives/ProfileCardDirective'));
app.directive('blockProducts', require('./directives/BlockProductsDirective'));
app.directive('googleMap', require('./directives/GoogleMapDirective'));
app.directive('pincodeControl', require('./directives/PincodeControlDirective'));
app.directive('scrollTo', require('./directives/ScrollToDirective'));
app.directive('collapse', require('./directives/CollapseDirective'));
app.directive('voucherCard', require('./directives/VoucherCardDirective'));
app.directive('productCard', require('./directives/ProductCardDirective'));
app.directive('appFooter', require('./directives/AppFooterDirective'));

app.directive('paginator', require('./directives/paginators/PaginatorDirective'));
app.directive('paginatorLoader', require('./directives/paginators/PaginatorLoaderDirective'));

app.directive('modalsRoot', require('./directives/modals/ModalsRootDirective'));
app.directive('modalItem', require('./directives/modals/ModalItemDirective'));
app.directive('modalScrollBraker', require('./directives/modals/ModalScrollBrakerDirective'));

// Modal Components
app.component('modalNotificationComponent', require('./components/Modals/ModalNotificationComponent'));

// Providers
app.provider('ApiRequest', require('./providers/ApiRequestProvider'));
app.provider('ModalRoute', require('./providers/ModalRouteProvider'));

// Filters
app.filter('pretty_json', require('./filters/PrettyJsonFilter'));
app.filter('to_fixed', require('./filters/ToFixedFilter'));

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