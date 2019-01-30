let ModalPinCodeComponent = function(
    $filter,
    IdentityService,
    FormBuilderService,
    ModalService
) {
    let $ctrl = this;

    $ctrl.$onInit = () => {

        $ctrl.authorizePincodeForm = FormBuilderService.build({
            auth_code: "",
        }, function(form) {
            form.lock();

            IdentityService.authorizeAuthCode(
                form.values.auth_code
            ).then((res) => {

                $ctrl.close();

                ModalService.open('modalNotification', {
                    type: 'action-result',
                    title: $filter('translate')('popup_auth.labels.join'),
                    description: $filter('translate')('popup_auth.notifications.confirmation'),
                    confirmBtnText: $filter('translate')('popup_auth.notifications.confirmation')
                });

            }, (res) => {
                form.unlock();
                form.errors = res.data.errors;

                if (res.status == 404) {
                    form.errors = {
                        auth_code: ["Unknown code."]
                    };
                }
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
        '$filter',
        'IdentityService',
        'FormBuilderService',
        'ModalService',
        ModalPinCodeComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-pin-code.html';
    }
};