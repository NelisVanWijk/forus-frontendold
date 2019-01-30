let repackResponse = (promise) => {
    return new Promise((resolve, reject) => {
        promise.then((res) => {
            resolve(res.data.data ? res.data.data : res.data);
        }, reject);
    });
}

let repackPagination = (promise) => {
    return new Promise((resolve, reject) => {
        promise.then((res) => {
            resolve(res.data);
        }, reject);
    });
}

let objectOnlyKeys = (obj, keys) => {
    let out = {};
    keys.forEach(key=>out[key] = obj[key]);
    return out;
};

/**
 * Permission middleware
 * 
 * @param {string} messageKey Error message key
 * @param {string|string[]} permissions List all required permissions
 * @param {bool} permissionsAll Require all permissions from the list
 * @param {string} dependencyKey Other resolver dependency
 * @param {function|bool} dependencyResolver Custom organization resolver from dependency
 */
let permissionMiddleware = (
    messageKey,
    permissions,
    permissionsAll = true,
    dependencyKey = 'organization',
    dependencyResolver = false
) => {
    return [
        dependencyKey,
        '$state',
        'PermissionsService', (
            dependency,
            $state,
            PermissionsService
        ) => {
            let organization;

            if (dependencyResolver && typeof(dependencyResolver) == 'function') {
                organization = dependencyResolver(dependency);
            } else {
                if (dependencyKey == 'organization') {
                    organization = dependency;
                } else if (dependencyKey == 'fund') {
                    organization = dependency.organization;
                }
            }

            if (!PermissionsService.hasPermission(organization, permissions, permissionsAll)) {
                setTimeout(() => {
                    $state.go('no-permission', {
                        message: messageKey
                    });
                }, 0);

                return false;
            }

            return true;
        }
    ];
};

let organziationResolver = (uriKey = 'organization_id') => {
    return [
        '$transition$',
        'OrganizationService',
        function(
            $transition$,
            OrganizationService
        ) {
            return repackResponse(
                OrganizationService.read(
                    $transition$.params()[uriKey]
                )
            );
        }
    ];
};

module.exports = ['$stateProvider', 'appConfigs', function($stateProvider, appConfigs) {
    $stateProvider.state({
        name: "home",
        url: "/",
        component: "homeComponent"
    });

    $stateProvider.state({
        name: "no-permission",
        url: "/no-permission/{message}",
        component: "noPermissionComponent",
        resolve: {
            message: ['$filter', '$transition$', function($filter, $transition$) {
                return {
                    title: $filter('translate')(
                        'permissions.' + $transition$.params().message + '.title'
                    ),
                    description: $filter('translate')(
                        'permissions.' + $transition$.params().message + '.description'
                    )
                };
            }]
        }
    });

    /**
     * Organizations
     */
    $stateProvider.state({
        name: "organizations",
        url: "/organizations",
        component: "organizationsComponent"
    });

    $stateProvider.state({
        name: "organizations-create",
        url: "/organizations/create",
        component: "organizationsEditComponent",
        resolve: {
            productCategories: ['ProductCategoryService', function(ProductCategoryService) {
                return repackResponse(ProductCategoryService.list());
            }]
        }
    });

    $stateProvider.state({
        name: "organizations-edit",
        url: "/organizations/{id}/edit",
        component: "organizationsEditComponent",
        resolve: {
            organization: organziationResolver('id'),
            permission: permissionMiddleware('organization-edit', 'manage_organization'),
            productCategories: [
                'permission',
                'ProductCategoryService',
                'appConfigs',
                function(
                    permission,
                    ProductCategoryService,
                    appConfigs
                ) {
                    if (appConfigs.client_key == 'general') {
                        return repackResponse(ProductCategoryService.listAll());
                    }

                    return repackResponse(ProductCategoryService.list());
                }
            ]
        }
    });

    $stateProvider.state({
        name: "organization-funds",
        url: "/organizations/{organization_id}/funds",
        component: "fundsMyComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-funds', [
                'manage_funds', 'view_finances'
            ], false),
            funds: function(permission, $transition$, FundService) {
                return repackResponse(
                    FundService.list(
                        $transition$.params().organization_id
                    )
                );
            },
            fundLevel: (permission) => "organizationFunds"
        }
    });

    // Organization providers
    $stateProvider.state({
        name: "organization-providers",
        url: "/organizations/{organization_id}/providers",
        component: "organizationProvidersComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-providers', 'manage_providers'),
            fundProviders: function(permission, $transition$, OrganizationService) {
                return repackResponse(
                    OrganizationService.listProviders(
                        $transition$.params().organization_id
                    )
                );
            },
            fundLevel: (permission) => "organizationFunds"
        }
    });

    // Organization validators
    $stateProvider.state({
        name: "validators",
        url: "/organizations/{organization_id}/validators",
        component: "organizationValidatorsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('organization-validators', 'manage_validators'),
            validators: function(permission, $transition$, OrganizationValidatorService) {
                return repackResponse(
                    OrganizationValidatorService.list(
                        $transition$.params().organization_id
                    )
                );
            }
        }
    });

    // Organization employees
    $stateProvider.state({
        name: "employees",
        url: "/organizations/{organization_id}/employees",
        component: "organizationEmployeesComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('employees-list', 'manage_employees'),
            employees: function(permission, $transition$, OrganizationEmployeesService) {
                return repackResponse(
                    OrganizationEmployeesService.list(
                        $transition$.params().organization_id
                    )
                );
            },
            roles: function(permission, RoleService) {
                return repackResponse(
                    RoleService.list()
                );
            }
        }
    });

    $stateProvider.state({
        name: "validators-create",
        url: "/organizations/{organization_id}/validators/create",
        component: "organizationValidatorsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('validators-create', 'manage_validators'),
        }
    });

    $stateProvider.state({
        name: "validators-edit",
        url: "/organizations/{organization_id}/validators/{id}/edit",
        component: "organizationValidatorsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('validators-edit', 'manage_validators'),
            validator: function(permission, $transition$, OrganizationValidatorService) {
                return repackResponse(
                    OrganizationValidatorService.read(
                        $transition$.params().organization_id,
                        $transition$.params().id
                    )
                );
            }
        }
    });

    $stateProvider.state({
        name: "financial-dashboard",
        url: "/organizations/{organization_id}/financial-dashboard/funds/{fund_id}",
        component: "financialDashboardComponent",
        params: {
            fund_id: {
                squash: true,
                value: null
            },
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('financial-dashboard', 'view_finances'),
            fund: function(permission, $transition$, FundService) {
                return $transition$.params().fund_id != null ? repackResponse(
                    FundService.read(
                        $transition$.params().organization_id,
                        $transition$.params().fund_id
                    )
                ) : new Promise((res) => res(null));
            },
            funds: function(permission, $transition$, FundService) {
                return repackResponse(
                    FundService.list(
                        $transition$.params().organization_id
                    )
                );
            },
            fundProviders: function(permission, $transition$, FundService) {
                if ($transition$.params().fund_id == null) {
                    return new Promise((res) => res(null));
                }

                return repackResponse(
                    FundService.listProviders(
                        $transition$.params().organization_id,
                        $transition$.params().fund_id,
                        'approved'
                    )
                );
            }
        }
    });

    /**
     * Offices
     */
    $stateProvider.state({
        name: "offices",
        url: "/organization/{organization_id}/offices",
        component: "officesComponent",
        resolve: {
            organization: organziationResolver(),
            offices: [
                'organization',
                '$transition$',
                'PermissionsService',
                'OfficeService', (
                    organization,
                    $transition$,
                    PermissionsService,
                    OfficeService
                ) => {
                    if (!PermissionsService.hasPermission(organization, 'manage_offices')) {
                        return false;
                    }

                    return repackResponse(
                        OfficeService.list(
                            $transition$.params().organization_id
                        )
                    );
                }
            ]
        }
    });

    $stateProvider.state({
        name: "offices-create",
        url: "/organization/{organization_id}/offices/create",
        component: "officesEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('offices-create', 'manage_offices'),
        }
    });

    $stateProvider.state({
        name: "offices-edit",
        url: "/organization/{organization_id}/offices/{id}/edit",
        component: "officesEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('offices-edit', 'manage_offices'),
            office: function(permission, $transition$, OfficeService) {
                return repackResponse(
                    OfficeService.read(
                        $transition$.params().organization_id,
                        $transition$.params().id
                    )
                );
            }
        }
    });

    /**
     * Funds
     */
    $stateProvider.state({
        name: "funds-create",
        url: "/organizations/{organization_id}/funds/create",
        component: "fundsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-create', 'manage_funds'),
            fundStates: function(permission, FundService) {
                return FundService.states();
            },
            productCategories: function(permission, ProductCategoryService) {
                return repackResponse(ProductCategoryService.list());
            }
        }
    });

    $stateProvider.state({
        name: "funds-show",
        url: "/organizations/{organization_id}/funds/{id}",
        component: "fundsShowComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-show', [
                'manage_funds', 'view_finances'
            ], false),
            fund: function(permission, $transition$, FundService) {
                return repackResponse(
                    FundService.read(
                        $transition$.params().organization_id,
                        $transition$.params().id
                    )
                );
            },
            fundLevel: (permission) => "fundShow"
        }
    });

    $stateProvider.state({
        name: "funds-edit",
        url: "/organizations/{organization_id}/funds/{id}/edit",
        component: "fundsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('funds-edit', 'manage_funds'),
            fund: [
                '$transition$',
                'FundService',
                function(
                    $transition$,
                    FundService
                ) {
                    return repackResponse(
                        FundService.read(
                            $transition$.params().organization_id,
                            $transition$.params().id
                        )
                    );
                }
            ],
            fundStates: function(FundService) {
                return FundService.states();
            },
            productCategories: function(ProductCategoryService) {
                return repackResponse(ProductCategoryService.listAll());
            }
        }
    });

    /**
     * Transactions
     */
    $stateProvider.state({
        name: "transactions",
        url: "/organizations/{organization_id}/transactions",
        component: "transactionsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('transactions-list', 'view_finances'),
            transactions: function($transition$, TransactionService, appConfigs) {
                return repackResponse(
                    TransactionService.list(
                        appConfigs.panel_type,
                        $transition$.params().organization_id
                    )
                );
            },
        }
    });

    $stateProvider.state({
        name: "transaction",
        url: "/organizations/{organization_id}/transactions/{address}",
        component: "transactionComponent",
        params: {
            fund_id: {
                squash: true,
                value: null
            },
        },
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('transactions-show', 'view_finances'),
            transaction: function($transition$, TransactionService, appConfigs) {
                return repackResponse(
                    TransactionService.show(
                        appConfigs.panel_type,
                        $transition$.params().organization_id,
                        $transition$.params().address,
                    )
                );
            }
        }
    });

    $stateProvider.state({
        name: "products",
        url: "/organizations/{organization_id}/products",
        component: "productsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-list', 'manage_products'),
            products: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.list(
                        $transition$.params().organization_id
                    )
                );
            }
        }
    });

    $stateProvider.state({
        name: "products-create",
        url: "/organizations/{organization_id}/products/create",
        component: "productsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-create', 'manage_products'),
            productCategories: function(ProductCategoryService) {
                return repackResponse(ProductCategoryService.list());
            },
            products: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.list(
                        $transition$.params().organization_id
                    )
                );
            }
        }
    });

    $stateProvider.state({
        name: "products-edit",
        url: "/organizations/{organization_id}/products/{id}/edit",
        component: "productsEditComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-edit', 'manage_products'),
            product: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.read(
                        $transition$.params().organization_id,
                        $transition$.params().id
                    )
                );
            },
            productCategories: function(ProductCategoryService) {
                return repackResponse(ProductCategoryService.list());
            }
        }
    });

    $stateProvider.state({
        name: "products-show",
        url: "/organizations/{organization_id}/products/{id}",
        component: "productsShowComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('products-show', 'manage_products'),
            product: function($transition$, ProductService) {
                return repackResponse(
                    ProductService.read(
                        $transition$.params().organization_id,
                        $transition$.params().id
                    )
                );
            }
        }
    });

    $stateProvider.state({
        name: "provider-funds",
        url: "/organizations/{organization_id}/provider/funds",
        component: "providerFundsComponent",
        resolve: {
            organization: organziationResolver(),
            permission: permissionMiddleware('provider-funds-list', 'manage_provider_funds'),
            fundsAvailable: function($transition$, ProviderFundService) {
                return repackResponse(
                    ProviderFundService.listAvailableFunds(
                        $transition$.params().organization_id
                    )
                );
            },
            funds: function($transition$, ProviderFundService) {
                return repackResponse(
                    ProviderFundService.listFunds(
                        $transition$.params().organization_id
                    )
                );
            },
            fundLevel: function() {
                return 'fundsAvailable';
            }
        }
    });

    // Validators
    $stateProvider.state({
        name: 'csv-validation',
        url: '/csv-validation/funds/{fund_id}?page&q',
        component: 'csvValidationComonent',
        params: {
            fund_id: {
                squash: true,
                value: null
            },
        },
        resolve: {
            fund: function($transition$, FundService) {
                return $transition$.params().fund_id != null ? repackResponse(
                    FundService.readPublic($transition$.params().fund_id)
                ) : new Promise((res) => res(null));
            },
            funds: function(FundService) {
                return repackResponse(
                    FundService.list()
                );
            },
            prevalidations: function($transition$, PrevalidationService) {
                return repackPagination(
                    PrevalidationService.list(objectOnlyKeys($transition$.params(), [
                        'page', 'q'
                    ]))
                );
            },
            recordTypes: function(RecordTypeService) {
                return repackResponse(
                    RecordTypeService.list()
                );
            }
        }
    });

    // Validators
    $stateProvider.state({
        name: 'validation-requests',
        url: '/validation-requests',
        component: 'validationRequestsComonent',
        resolve: {
            validatorRequests: function(ValidatorRequestService) {
                return repackResponse(
                    ValidatorRequestService.list()
                );
            }
        }
    });

    $stateProvider.state({
        name: 'validation-request',
        url: '/validation-request/{id}',
        component: 'validationRequestComonent',
        resolve: {
            validatorRequest: function($transition$, ValidatorRequestService) {
                return repackResponse(
                    ValidatorRequestService.read(
                        $transition$.params().id
                    )
                );
            }
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
                    appConfigs.client_key + '_' + appConfigs.panel_type,
                    $state.params.token
                ).then(function(res) {
                    CredentialsService.set(res.data.access_token);
                    $rootScope.loadAuthUser();
                    $state.go('home');
                }, () => {
                    alert("Token expired or unknown.");
                    $state.go('home');
                });
            }
        ],
        data: {
            token: null
        }
    });

    if (appConfigs.panel_type == 'provider' || appConfigs.panel_type == 'sponsor') {
        $stateProvider.state({
            name: "sign-up",
            url: "/sign-up",
            component: "signUpComponent",
            resolve: {
                productCategories: function(ProductCategoryService) {
                    return repackResponse(ProductCategoryService.list());
                }
            }
        });
    }
}];