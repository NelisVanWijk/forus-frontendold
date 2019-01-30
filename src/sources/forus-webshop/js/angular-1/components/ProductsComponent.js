let ProductsComponent = function(
    $state,
    appConfigs
) {
    let $ctrl = this;

    if (!appConfigs.features.products.list) {
        return $state.go('home');
    }

    $ctrl.$onInit = function() {
        
    };
};

module.exports = {
    bindings: {
        products: '<',
        productCategories: '<'
    },
    controller: [
        '$state',
        'appConfigs',
        ProductsComponent
    ],
    templateUrl: 'assets/tpl/pages/products.html'
};