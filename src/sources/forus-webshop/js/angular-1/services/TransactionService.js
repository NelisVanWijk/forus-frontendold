let TransactionService = function(
    ApiRequest
) {
    return new (function() {
        this.list = function(organization_id, fund_id) {
            let uri = "/platform";

            if (organization_id) {
                uri += '/organizations/' + organization_id;

                if (fund_id) {
                    uri += '/funds/' + fund_id;
                }
            }

            return ApiRequest.get(uri + '/transactions');
        };

        this.show = function(organization_id, fund_id, id) {
            let uri = "/platform";

            if (organization_id) {
                uri += '/organizations/' + organization_id;

                if (fund_id) {
                    uri += '/funds/' + fund_id;
                }
            }

            return ApiRequest.get(uri + '/transactions/' + id);
        };
    });
};

module.exports = [
    'ApiRequest',
    TransactionService
];