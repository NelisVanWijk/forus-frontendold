let ModalFundTopUpComponent = function(
    FundService
) {
    let $ctrl = this;

    $ctrl.$onInit = () => {
        let fund = $ctrl.modal.scope.fund;

        FundService.makeTopUp(fund.organization_id, fund.id).then((res) => {
            $ctrl.topUpCode = res.data.data.code;
            $ctrl.topUpIban = res.data.data.iban;
            $ctrl.isReady = true;
        }, $ctrl.close);
    };
    $ctrl.$onDestroy = function() {};
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        'FundService',
        ModalFundTopUpComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-fund-top-up.html';
    }
};