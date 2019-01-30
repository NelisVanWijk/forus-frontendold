let ModalNotificationComponent = function(
    $sce
) {
    let $ctrl = this;

    $ctrl.showCloseBtn = false;
    $ctrl.showCancelBtn = false;
    $ctrl.showConfirmBtn = false;

    $ctrl.$onInit = () => {
        let type = $ctrl.modal.scope.type;
        $ctrl.class = 'modal-notification-' + type;

        $ctrl.title = $sce.trustAsHtml($ctrl.modal.scope.title);
        $ctrl.description = $ctrl.modal.scope.description ? $sce.trustAsHtml($ctrl.modal.scope.description) : null;
        $ctrl.subdescription = $ctrl.modal.scope.subdescription ? $sce.trustAsHtml($ctrl.modal.scope.subdescription) : null;
        $ctrl.icon = $ctrl.modal.scope.icon ? getIcon($ctrl.modal.scope.icon) : null;

        switch (type){
            case 'info': {
                $ctrl.showCloseBtn = true;
            }; break;
            case 'danger': {
                $ctrl.showCancelBtn = true;
            }; break;
            case 'confirm': {
                $ctrl.showCancelBtn = true;
                $ctrl.showConfirmBtn = true;
            }; break;
            default:{
                $ctrl.showCloseBtn = true;
            }
        }
    };

    let getIcon = (icon) => {

        switch (icon){
            case 'voucher_apply': {
                return './assets/img/modal/voucher-apply.png';
            }; break;
            default:{
                return './assets/img/modal/info.png';
            }
        }
    };

    $ctrl.cancel = () => {
        if (typeof($ctrl.modal.scope.cancel) === 'function') {
            $ctrl.modal.scope.cancel();
        }

        $ctrl.close();
    };

    $ctrl.confirm = () => {
        if (typeof($ctrl.modal.scope.confirm) === 'function') {
            $ctrl.modal.scope.confirm();
        }

        $ctrl.close();
    };

    $ctrl.$onDestroy = function() {};
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        '$sce',
        ModalNotificationComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-notification.html';
    }
};