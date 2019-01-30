let FundsShowComponent = function() {
    let $ctrl = this;

    $ctrl.$onInit = function() {};
};

module.exports = {
    bindings: {
        fund: '<',
        fundLevel: '<'
    },
    controller: [
        FundsShowComponent
    ],
    templateUrl: 'assets/tpl/pages/funds-show.html'
};