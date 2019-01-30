let OrganizationProvidersComponent = function(
    $state,
    FundService
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.fundProviders.map(function(providerFund) {
            providerFund.organization.fundCategories = 
            providerFund.organization.product_categories.map(function(category) {
                return category.name;
            });
            providerFund.order = {
                'pending': 1,
                'approved': 0,
                'declined': -1,
            } [providerFund.state];
        });
    };

    $ctrl.approveProvider = function(providerFund) {
        FundService.approveProvider(
            providerFund.fund.organization_id,
            providerFund.fund.id,
            providerFund.id
        ).then((res) => {
            $state.reload();
        });
    }

    $ctrl.declineProvider = function(providerFund) {
        FundService.declineProvider(
            providerFund.fund.organization_id,
            providerFund.fund.id,
            providerFund.id
        ).then((res) => {
            $state.reload();
        });
    }
};

module.exports = {
    bindings: {
        fundProviders: '<'
    },
    controller: [
        '$state',
        'FundService',
        OrganizationProvidersComponent
    ],
    templateUrl: 'assets/tpl/pages/organization-providers.html'
};