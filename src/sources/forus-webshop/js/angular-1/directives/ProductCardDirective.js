let ProductCardDirective = function(
    $scope,
) {
    $scope.productCard = $scope.product;
};

module.exports = () => {
    return {
        scope: {
            product: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            ProductCardDirective
        ],
        templateUrl: 'assets/tpl/directives/product-card.html'
    };
};