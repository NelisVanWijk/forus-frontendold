module.exports = [
    'ApiRequest',
    '$rootScope',
    function(
        ApiRequest,
        $rootScope
    ) {
        return new(function() {
            this.list = function() {
                return ApiRequest.get('/platform/organizations');
            };

            this.listProviders = function(
                organization_id
            ) {
                return ApiRequest.get(
                    '/platform/organizations/' + organization_id + '/providers'
                );
            };

            this.store = function(values) {
                return ApiRequest.post('/platform/organizations', values);
            };

            this.update = function(id, values) {
                return ApiRequest.patch('/platform/organizations/' + id, values);
            };
            
            this.read = function(id) {
                return ApiRequest.get('/platform/organizations/' + id);
            }

            this.use = function(id) {
                localStorage.setItem('active_organization', id);
                $rootScope.$broadcast('organization-changed', id);
            }

            this.clearActive = function() {
                localStorage.removeItem('active_organization');
                $rootScope.$broadcast('organization-changed', null);
            }

            this.active = function() {
                let id = parseInt(localStorage.getItem('active_organization') || null);

                return isNaN(id) ? false : id;
            }

            this.apiResourceToForm = function(apiResource) {
                return {
                    product_categories: apiResource.product_categories.map(
                        function(product_category) {
                            return product_category.id;
                        }
                    ),
                    name: apiResource.name,
                    iban: apiResource.iban,
                    email: apiResource.email,
                    phone: apiResource.phone,
                    kvk: apiResource.kvk,
                    btw: apiResource.btw,
                };
            };
        });
    }
];