module.exports = function($stateProvider) {
    let repackResponse = (promise) => {
        return new Promise((resolve, reject) => {
            promise.then((res) => {
                resolve(res.data.data ? res.data.data : res.data);
            }, reject);
        });
    }

    $stateProvider.state({
        name: "home",
        url: "/",
        component: "homeComponent"
    });

    $stateProvider.state({
        name: "funds",
        url: "/funds",
        component: "fundsComponent",
        resolve: {
            funds: function($transition$, FundService) {
                return repackResponse(
                    FundService.list()
                );
            },
            vouchers: function($transition$, AuthService, VoucherService) {
                return AuthService.hasCredentials() ? repackResponse(
                    VoucherService.list()
                ) : new Promise(resolve => resolve([]));
            },
        }
    });

    $stateProvider.state({
        name: "products",
        url: "/products",
        component: "productsComponent",
        resolve: {
            products: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.list()
                );
            },
            productCategories: function($transition$, ProductCategoryService) {
                return repackResponse(
                    ProductCategoryService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: "products-show",
        url: "/products/{id}",
        component: "productComponent",
        data: {
            id: null
        },
        resolve: {
            vouchers: function($transition$, AuthService, VoucherService) {
                return AuthService.hasCredentials() ? repackResponse(
                    VoucherService.list()
                ) : new Promise(resolve => resolve([]));
            },
            product: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.read(
                        $transition$.params().id
                    )
                );
            },
        }
    });

    $stateProvider.state({
        name: "products-apply",
        url: "/products/{id}/apply",
        component: "productApplyComponent",
        data: {
            id: null
        },
        resolve: {
            vouchers: function($transition$, AuthService, VoucherService) {
                return AuthService.hasCredentials() ? repackResponse(
                    VoucherService.list()
                ) : new Promise(resolve => resolve([]));
            },
            product: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.read(
                        $transition$.params().id
                    )
                );
            },
        }
    });

    $stateProvider.state({
        name: "vouchers",
        url: "/vouchers",
        component: "vouchersComponent",
        resolve: {
            vouchers: function($transition$, VoucherService) {
                return repackResponse(
                    VoucherService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: 'voucher',
        url: '/voucher/{address}',
        component: 'voucherComponent',
        data: {
            address: null
        },
        resolve: {
            voucher: function($transition$, VoucherService) {
                return repackResponse(
                    VoucherService.get(
                        $transition$.params().address
                    )
                )
            }
        }
    });

    $stateProvider.state({
        name: 'records',
        url: '/records',
        component: 'recordsComponent',
        resolve: {
            records: function($transition$, RecordService) {
                return repackResponse(
                    RecordService.list()
                )
            },
            recordTypes: function($transition$, RecordTypeService) {
                return repackResponse(
                    RecordTypeService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: 'record-validate',
        url: '/records/{id}/validate',
        component: 'recordValidateComponent',
        data: {
            id: null
        },
        resolve: {
            record: function($transition$, RecordService) {
                return repackResponse(
                    RecordService.read(
                        $transition$.params().id
                    )
                );
            },
            records: function($transition$, RecordService) {
                return repackResponse(
                    RecordService.list()
                );
            },
            validators: function($transition$, ValidatorService) {
                return repackResponse(
                    ValidatorService.list()
                );
            },
            validationRequests: function($transition$, ValidatorRequestService) {
                return repackResponse(
                    ValidatorRequestService.list()
                );
            },
            recordTypes: function($transition$, RecordTypeService) {
                return repackResponse(
                    RecordTypeService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: 'record-validations',
        url: '/records/{id}/validations',
        component: 'recordValidationsComponent',
        data: {
            id: null
        },
        resolve: {
            record: function($transition$, RecordService) {
                return repackResponse(
                    RecordService.read(
                        $transition$.params().id
                    )
                )
            },
            records: function($transition$, RecordService) {
                return repackResponse(
                    RecordService.list()
                )
            },
            recordTypes: function($transition$, RecordTypeService) {
                return repackResponse(
                    RecordTypeService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: 'record-create',
        url: '/records/create',
        component: 'recordCreateComponent',
        data: {},
        resolve: {
            recordTypes: function($transition$, RecordTypeService) {
                return repackResponse(
                    RecordTypeService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: "fund-apply",
        url: "/funds/{id}",
        component: "fundApplyComponent",
        data: {
            id: null
        },
        resolve: {
            fund: function($transition$, FundService) {
                return repackResponse(
                    FundService.readById(
                        $transition$.params().id
                    )
                );
            },
            records: function($transition$, RecordService) {
                return repackResponse(
                    RecordService.list()
                );
            },
            recordTypes: function($transition$, RecordTypeService) {
                return repackResponse(
                    RecordTypeService.list()
                );
            },
            vouchers: function($transition$, VoucherService) {
                return repackResponse(
                    VoucherService.list()
                );
            },
        }
    });

    $stateProvider.state({
        name: "restore-email",
        url: "/identity-restore?token",
        controller: [
            '$rootScope',
            '$state',
            'IdentityService',
            'CredentialsService',
            'appConfigs',
            function(
                $rootScope,
                $state,
                IdentityService,
                CredentialsService,
                appConfigs
            ) {
                IdentityService.authorizeAuthEmailToken(
                    appConfigs.client_key + '_webshop',
                    $state.params.token
                ).then(function(res) {
                    CredentialsService.set(res.data.access_token);
                    $rootScope.loadAuthUser();
                    $state.go('home');
                }, () => {
                    alert("Token expired or unknown.");
                    $state.go('home');
                });
            }],
        data: {
            token: null
        }
    });
};