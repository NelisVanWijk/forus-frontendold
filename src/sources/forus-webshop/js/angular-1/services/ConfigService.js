module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        let apiPrefix = '/platform/config';

        return new (function() {
            this.get = function(type) {
                return ApiRequest.get(apiPrefix + '/' + (type || 'webshop'));
            }
        });
    }
];