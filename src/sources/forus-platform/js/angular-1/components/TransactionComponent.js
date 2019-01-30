let TransactionComponent = function() {
    let $ctrl = this;

    $ctrl.$onInit = function () {};
};

module.exports = {
    bindings: {
        transaction: '<',
    },
    controller: [
        TransactionComponent
    ],
    templateUrl: 'assets/tpl/pages/transaction.html'
};