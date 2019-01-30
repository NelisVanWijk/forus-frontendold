let ValidatorService = function(ApiRequest) {
    let uriPrefix = '/platform/validators';

    return new(function() {
        this.list = function() {
            return ApiRequest.get(
                uriPrefix
            );
        };
    });
};

module.exports = [
    'ApiRequest',
    ValidatorService
];