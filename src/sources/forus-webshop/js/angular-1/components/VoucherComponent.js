let VoucherComponent = function(
    $rootScope,
    VoucherService,
    ModalService
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

        qrCodeEl.removeAttribute('title');

        $ctrl.voucherCard = VoucherService.composeCardData($ctrl.voucher);

        $ctrl.sendVoucherEmail = function(voucher) {
            VoucherService.sendToEmail(voucher.address).then(res => {
                ModalService.open('modalNotification', {
                    type: 'action-result',
                    class: 'modal-description-pad',
                    title: $filter('translate')('popup_auth.labels.voucher_email'),
                    description: $filter('translate')('popup_auth.notifications.voucher_email'),
                    confirmBtnText: $filter('translate')('popup_auth.buttons.confirm')
                });
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
        'ModalService',
        VoucherComponent
    ],
    templateUrl: 'assets/tpl/pages/voucher.html'
};