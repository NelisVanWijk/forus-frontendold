let ProviderFundService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';

    return new (function() {
        this.listAvailableFunds = function(organization_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/provider/funds-available'
            );
        };

        this.listFunds = function(organization_id, state) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/provider/funds',
                state ? {state: state} : {}
            );
        };

        this.applyForFund = function(organization_id, fund_id) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/provider/funds', {
                    fund_id: fund_id
                }
            );
        };
    });
};

module.exports = [
    'ApiRequest',
    ProviderFundService
];