let HomeComponent = function(
    ModalService
) {
    let $ctrl = this;

    $ctrl.showPopupOffices = function() {
        ModalService.open('modalOffices', {});
    };
};

module.exports = {
    bindings: {},
    controller: [
        'ModalService',
        HomeComponent
    ],
    templateUrl: 'assets/tpl/pages/home.html'
};