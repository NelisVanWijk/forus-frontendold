let ProductService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';

    return new(function() {
        this.list = function(organization_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/products'
            );
        };

        this.store = function(organization_id, values) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/products', values
            );
        };

        this.update = function(organization_id, id, values) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/products/' + id, values
            );
        };

        this.read = function(organization_id, id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/products/' + id
            );
        }

        this.destroy = function(organization_id, id) {
            return ApiRequest.delete(
                uriPrefix + organization_id + '/products/' + id
            );
        };

        this.apiResourceToForm = function(apiResource) {
            return {
                'name': apiResource.name,
                'description': apiResource.description,
                'price': parseFloat(apiResource.price),
                'old_price': parseFloat(apiResource.old_price),
                'total_amount': apiResource.total_amount,
                'expire_at': apiResource.expire_at,
                'product_category_id': apiResource.product_category_id,
            };
        };
    });
};

module.exports = [
    'ApiRequest',
    ProductService
];