let ProductCategoryService = function(
    ApiRequest
) {
    return new (function() {
        this.list = function() {
            return ApiRequest.get('/platform/product-categories');
        };
    });
};

module.exports = [
    'ApiRequest',
    ProductCategoryService
];