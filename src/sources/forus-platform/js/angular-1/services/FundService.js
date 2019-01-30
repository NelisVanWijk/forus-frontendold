let FundService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';

    return new (function() {
        this.list = function(organization_id) {
            if (organization_id) {
                return ApiRequest.get(
                    uriPrefix + organization_id + '/funds'
                );
            }
            return ApiRequest.get('/platform/funds');
        };

        this.store = function(organization_id, values) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/funds', values
            );
        };

        this.update = function(organization_id, id, values) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/funds/' + id, values
            );
        };

        this.read = function(organization_id, id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + id
            );
        }

        this.readPublic = function(fund_id) {
            return ApiRequest.get('/platform/funds/' + fund_id);
        };

        this.readFinances = function (organization_id, id, data) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + id + '/finances', 
                data || {}
            );
        }

        this.listProviders = function (organization_id, fund_id, state) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers', {
                    state: state
                }
            );
        };

        this.readProvider = function (organization_id, fund_id, provider_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + provider_id
            );
        };

        this.readProvidersTransactions = function (organization_id, fund_id, provider_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + provider_id + '/transactions'
            );
        };

        this.readProvidersTransaction = function (organization_id, fund_id, provider_id, transaction_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + provider_id + '/transactions/' + transaction_id
            );
        };

        this.readProvidersFinances = function (organization_id, fund_id, provider_id, data) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + provider_id + '/finances',
                data
            );
        };

        this.approveProvider = function(organization_id, fund_id, id) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + id, {
                    state: 'approved'
                }
            );
        };

        this.declineProvider = function(organization_id, fund_id, id) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/funds/' + fund_id + '/providers/' + id, {
                    state: 'declined'
                }
            );
        };

        this.states = function() {
            return [{
                name: "Actief",
                value: 'active',
            }, {
                name: "Gepauzeerd",
                value: 'paused',
            }, {
                name: "Gesloten",
                value: 'closed',
            }];
        }

        this.makeTopUp = function (organization_id, fund_id) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/funds/' + fund_id + '/top-up');
        };

        this.apiResourceToForm = function(apiResource) {
            return {
                product_categories: apiResource.product_categories.map(
                    function(product_category) {
                        return product_category.id;
                    }
                ),
                name: apiResource.name,
                state: apiResource.state,
                start_date: apiResource.start_date,
                end_date: apiResource.end_date,
            };
        };

        this.changeState = function(apiResource, state) {
            let formValues = this.apiResourceToForm(apiResource);
            
            formValues.state = state;
            
            return this.update(
                apiResource.organization_id, 
                apiResource.id, 
                formValues
            );
        };
    });
};

module.exports = [
    'ApiRequest',
    FundService
];