let TransactionService = function(
    ApiRequest
) {
    return new(function() {
        this.list = function(type, organization_id) {
            return ApiRequest.get(
                '/platform/organizations/' + organization_id + '/' +
                type + '/transactions'
            );
        };

        this.show = function(type, organization_id, address) {
            return ApiRequest.get(
                '/platform/organizations/' + organization_id + '/' +
                type + '/transactions/' + address
            );
        };
    });
};

module.exports = [
    'ApiRequest',
    TransactionService
];