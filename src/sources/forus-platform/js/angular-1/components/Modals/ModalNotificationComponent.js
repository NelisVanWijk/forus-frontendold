let ModalNotificationComponent = function(
    $sce,
    $filter
) {
    let $ctrl = this;

    $ctrl.showCloseBtn = false;
    $ctrl.showCancelBtn = false;
    $ctrl.showConfirmBtn = false;

    $ctrl.confirmBtnText = $filter('translate')('modal.buttons.confirm');
    $ctrl.closeBtnText = $filter('translate')('modal.buttons.close');
    $ctrl.cancelBtnText = $filter('translate')('modal.buttons.cancel');

    $ctrl.$onInit = () => {
        let type = $ctrl.modal.scope.type;
        let additionalClass = $ctrl.modal.scope.class ? $ctrl.modal.scope.class : '';

        $ctrl.class = 'modal-notification-' + type + ' ' + additionalClass;

        $ctrl.title = $sce.trustAsHtml($ctrl.modal.scope.title);
        $ctrl.description = $ctrl.modal.scope.description ? $sce.trustAsHtml($ctrl.modal.scope.description) : null;
        $ctrl.subdescription = $ctrl.modal.scope.subdescription ? $sce.trustAsHtml($ctrl.modal.scope.subdescription) : null;
        $ctrl.icon = $ctrl.modal.scope.icon ? getIcon($ctrl.modal.scope.icon) : null;
        $ctrl.confirmBtnText = $ctrl.modal.scope.confirmBtnText ? $ctrl.modal.scope.confirmBtnText : $ctrl.confirmBtnText;
        $ctrl.closeBtnText = $ctrl.modal.scope.closeBtnText ? $ctrl.modal.scope.closeBtnText : $ctrl.closeBtnText;
        $ctrl.cancelBtnText = $ctrl.modal.scope.cancelBtnText ? $ctrl.modal.scope.cancelBtnText : $ctrl.cancelBtnText;

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
            case 'action-result': {
                $ctrl.showConfirmBtn = true;
            }; break;
            default:{
                $ctrl.showCloseBtn = true;
            }
        }
    };

    let getIcon = (icon) => {

        switch (icon){
            case 'product_error_create_more': {
                return './assets/img/modal/product-error.png';
            }; break;
            case 'product_create': {
                return './assets/img/modal/product-create.png';
            }; break;
            case 'fund_applied': {
                return './assets/img/modal/fund_applied.png';
            }; break;
            default:{
                return './assets/img/modal/product-error.png';
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
        '$filter',
        ModalNotificationComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-notification.html';
    }
};