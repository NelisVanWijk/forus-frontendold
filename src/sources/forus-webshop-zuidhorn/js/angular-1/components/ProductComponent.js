let _string = require("underscore.string");

let ProductComponent = function (
    $state,
    $filter,
    appConfigs,
    ModalService,
    VoucherService
) {
    let $ctrl = this;
    let vouchers = [];

    if (!appConfigs.features.products.show) {
        return $state.go('home');
    }

    $ctrl.isApplicable = false;

    $ctrl.$onInit = function() {
        let fundIds = $ctrl.product.funds.map(fund => fund.id);

        vouchers = $ctrl.vouchers.filter(function (voucher) {
            return (fundIds.indexOf(voucher.fund_id) != -1) && (
                parseFloat($ctrl.product.price) <= parseFloat(voucher.amount)
            ) && !voucher.parent;
        });

        $ctrl.isApplicable = vouchers.length > 0;
    };

    $ctrl.applyProduct = () => {

        if(vouchers.length == 1){
            let voucher = vouchers[0];

            let popupTitle = _string.sprintf(
                $filter('translate')('product_apply.popup.title'),
                $ctrl.product.name,
                $ctrl.product.expire_at,
                $ctrl.product.price
            );

            let popupSubDescription = _string.sprintf(
                $filter('translate')('product_apply.popup.expiration_information'),
                $ctrl.product.expire_at
            );

            return ModalService.open('modalNotification', {
                type: 'confirm',
                title: popupTitle,
                subdescription: popupSubDescription,
                icon: 'voucher_apply',
                confirm: () => {
                    return VoucherService.makeProductVoucher(
                        voucher.address,
                        $ctrl.product.id
                    ).then(res => {
                        $state.go('voucher', res.data.data);
                    }, console.error);
                }
            });
        } else {
            return $state.go('products-apply', {
                id: $ctrl.product.id
            });
        }
    };
};

module.exports = {
    bindings: {
        product: '<',
        vouchers: '<',
    },
    controller: [
        '$state',
        '$filter',
        'appConfigs',
        'ModalService',
        'VoucherService',
        ProductComponent
    ],
    templateUrl: 'assets/tpl/pages/product.html'
};