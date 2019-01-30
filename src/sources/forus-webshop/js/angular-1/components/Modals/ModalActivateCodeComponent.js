let ModalAuthComponent = function(
    $state,
    FormBuilderService,
    PrevalidationService,
    ConfigService,
    FundService
) {

    let $ctrl = this;

    $ctrl.$onInit = () => {

        $ctrl.activateCodeForm = FormBuilderService.build({
            code: "",
        }, function(form) {
            if (!form.values.code) {
                form.errors.code = true;
                return;
            }

            form.lock();

            PrevalidationService.redeem(form.values.code).then((res) => {
                $ctrl.close();

                ConfigService.get().then((res) => {
                    if (!res.data.funds.list) {
                        FundService.applyToFirstAvailable().then(res => {
                            $state.go('voucher', res.data.data);
                        }, () => {
                            alert('Sorry no funds to apply to.');
                        });
                    } else if (res.data.records.list) {
                        $state.go('records');
                    } else {
                        $state.go('home');
                    }
                });
            }, (res) => {
                form.errors.code = true;
                form.unlock();
            });
        });
    };
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$state',
        'FormBuilderService',
        'PrevalidationService',
        'ConfigService',
        'FundService',
        ModalAuthComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-activate-code.html';
    }
};