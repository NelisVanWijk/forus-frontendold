let FundsMyComponent = function(
    $state,
    $stateParams
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.emptyBlockLink = $state.href('funds-create', $stateParams);
    };
};

module.exports = {
    bindings: {
        funds: '<',
        fundLevel: '<'
    },
    controller: [
        '$state',
        '$stateParams',
        FundsMyComponent
    ],
    templateUrl: 'assets/tpl/pages/funds-my.html'
};