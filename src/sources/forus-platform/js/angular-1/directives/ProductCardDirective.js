let ProductCardDirective = function(
    $scope, 
    $state, 
    FundService,
    ProductService
) {
    $scope.productFunds = $scope.product.funds;

    $scope.changeState = function(state) {
        FundService.changeState($scope.fund, state).then((res) => {
            $scope.fund = res.data.data;
        });
    };

    $scope.deleteProduct = function(product) {
        ProductService.destroy(
            product.organization_id,
            product.id
        ).then((res) => {
            $state.reload();
        });
    };
};

module.exports = () => {
    return {
        scope: {
            product: '=',
            level: '@'
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$state',
            'FundService',
            'ProductService',
            ProductCardDirective
        ],
        templateUrl: 'assets/tpl/directives/product-card.html' 
    };
};