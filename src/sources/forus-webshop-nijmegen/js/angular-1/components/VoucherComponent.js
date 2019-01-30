let VoucherComponent = function(
    $rootScope,
    VoucherService
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        let qrCodeEl = document.getElementById('voucher_qr');

        new QRCode(qrCodeEl, {
            text: JSON.stringify({
                type: 'voucher',
                value: $ctrl.voucher.address
            }),
            correctLevel: QRCode.CorrectLevel.L
        });

        qrCodeEl.removeAttribute('title');;

        $ctrl.voucherCard = VoucherService.composeCardData($ctrl.voucher);

        $ctrl.sendVoucherEmail = function(voucher) {
            VoucherService.sendToEmail(voucher.address).then(res => {
                $rootScope.popups.auth.open('voucher-email-sent')
            });
        };
    };
};

module.exports = {
    bindings: {
        voucher: '<'
    },
    controller: [
        '$rootScope',
        'VoucherService',
        VoucherComponent
    ],
    templateUrl: 'assets/tpl/pages/voucher.html'
};