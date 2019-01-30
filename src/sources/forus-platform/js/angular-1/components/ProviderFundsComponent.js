let ProviderFundsComponent = function() {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        let sort = {
            'pending': 0,
            'approved': 1,
            'declined': 2,
        };

        $ctrl.funds = $ctrl.funds.sort((a, b) => sort[a.state] - sort[b.state]);
    };
};

module.exports = {
    bindings: {
        funds: '<',
        fundsAvailable: '<',
        fundLevel: '<',
        organization: '<',
    },
    controller: [
        ProviderFundsComponent
    ],
    templateUrl: 'assets/tpl/pages/provider-funds.html'
};