let FundsComponent = function(
    $state,
    appConfigs
) {
    let $ctrl = this;

    if (!appConfigs.features || !appConfigs.features.funds.list) {
        return $state.go('home');
    }

    $ctrl.$onInit = function() {
        $ctrl.funds = $ctrl.funds.map(function(fund) {
            fund.categories = fund.product_categories.map(function(category) {
                return category.name;
            }).join(', ');

            fund.voucherCanBeUsed = $ctrl.vouchers.filter(voucher => {
                return voucher.fund_id == fund.id;
            }).length == 0;

            return fund;
        });
    };
};

module.exports = {
    bindings: {
        funds: '<',
        vouchers: '<'
    },
    controller: [
        '$state',
        'appConfigs',
        FundsComponent
    ],
    templateUrl: 'assets/tpl/pages/funds.html'
};