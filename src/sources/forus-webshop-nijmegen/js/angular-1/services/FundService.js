let FundService = function(
    $q,
    ApiRequest
) {
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

        this.apply = function(id) {
            return ApiRequest.post(
                '/platform/funds/' + id + '/apply'
            );
        };

        this.applyToFirstAvailable = () => {
            return $q((resolve, reject) => {
                this.list().then((res) => {
                    if (res.data.data.length < 1) {
                        reject();
                    } else {
                        this.apply(res.data.data[0].id).then(function(res) {
                            resolve(res);
                        }, reject);
                    }
                }, reject);
            });
        };

        this.readById = function(id) {
            return ApiRequest.get(
                '/platform/funds/' + id
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
                name: "Active",
                value: 'active',
            }, {
                name: "Paused",
                value: 'paused',
            }, {
                name: "Closed",
                value: 'closed',
            }];
        }

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
    '$q',
    'ApiRequest',
    FundService
];