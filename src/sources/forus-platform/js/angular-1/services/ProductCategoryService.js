let ProductCategoryService = function(
    ApiRequest
) {
    return new (function() {
        this.list = function() {
            return ApiRequest.get('/platform/product-categories');
        };

        this.listAll = function() {
            return ApiRequest.get('/platform/product-categories', {
                all: true
            });
        };
    });
};

module.exports = [
    'ApiRequest',
    ProductCategoryService
];