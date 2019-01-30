let ProductService = function(ApiRequest) {
    let uriPrefix = '/platform/products';

    return new (function() {
        this.list = function(data) {
            return ApiRequest.get(uriPrefix, data);
        };

        this.sample = function() {
            return ApiRequest.get(uriPrefix + '/sample');
        };

        this.read = function(id) {
            return ApiRequest.get(uriPrefix + '/' + id);
        }
    });
};

module.exports = [
    'ApiRequest',
    ProductService
];