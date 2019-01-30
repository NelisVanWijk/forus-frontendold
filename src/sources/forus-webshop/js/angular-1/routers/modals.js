module.exports = ['ModalRouteProvider', function(ModalRouteProvider) {
    ModalRouteProvider.modal('modalNotification', {
        component: 'modalNotificationComponent'
    });

    ModalRouteProvider.modal('modalOffices', {
        component: 'modalOfficesComponent'
    });

    ModalRouteProvider.modal('modalAuth', {
        component: 'modalAuthComponent'
    });

    ModalRouteProvider.modal('modalPinCode', {
        component: 'modalPinCodeComponent'
    });

    ModalRouteProvider.modal('modalActivateCode', {
        component: 'modalActivateCodeComponent'
    });

    ModalRouteProvider.modal('modalAuthCode', {
        component: 'modalAuthCodeComponent'
    });

}];