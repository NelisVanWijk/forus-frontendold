let OfficesComponent = function(
    $state,
    $stateParams,
    OfficeService
) {
    let $ctrl = this;

    $ctrl.weekDays = OfficeService.scheduleWeekDays();

    $ctrl.$onInit = function() {
        $ctrl.fundCategories = $ctrl.organization.product_categories.map((val) => {
            return val.name;
        });

        $ctrl.emptyBlockLink = $state.href('offices-create', $stateParams);
    };
};

module.exports = {
    bindings: {
        organization: '<',
        offices: '<',
    },
    controller: [
        '$state',
        '$stateParams',
        'OfficeService',
        OfficesComponent
    ],
    templateUrl: 'assets/tpl/pages/offices.html'
};