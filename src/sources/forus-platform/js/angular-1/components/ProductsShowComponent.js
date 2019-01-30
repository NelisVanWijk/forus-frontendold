let ProductsShowComponent = function() {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.cardLevel = "show";
    };
};

module.exports = {
    bindings: {
        product: '<'
    },
    controller: [
        ProductsShowComponent
    ],
    templateUrl: 'assets/tpl/pages/products-show.html'
};