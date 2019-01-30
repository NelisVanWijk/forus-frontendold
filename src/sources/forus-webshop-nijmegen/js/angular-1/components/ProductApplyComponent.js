let _string = require("underscore.string");

let ProductApplyComponent = function(
    $state,
    $filter,
    VoucherService,
    ModalService
) {
    let $ctrl = this;

    $ctrl.isApplicable = false;

    $ctrl.$onInit = function() {
        let fundIds = $ctrl.product.funds.map(fund => fund.id);

        $ctrl.applicableVouchers = $ctrl.vouchers.filter(function(voucher) {
            return (fundIds.indexOf(voucher.fund_id) != -1) && (
                $ctrl.product.price <= voucher.amount
            ) && !voucher.parent;
        });

        $ctrl.isApplicable = $ctrl.applicableVouchers.length > 0;

        if (!$ctrl.isApplicable) {
            return $state.go('products-show', {
                id: $ctrl.product.id
            });
        }
    };

    $ctrl.applyForProduct = (voucher) => {

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
        'VoucherService',
        'ModalService',
        ProductApplyComponent
    ],
    templateUrl: 'assets/tpl/pages/product-apply.html'
};