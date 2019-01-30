let ProductCategoriesControlDirective = function($scope) {
    if (!Array.isArray($scope.options)) {
        $scope.options = [];
    }

    if (!Array.isArray($scope.ngModel)) {
        $scope.ngModel = [];
    }

    let getFiltred = (list, type) => {
        return list.filter(option => option.service == type);
    };

    $scope.filterOptions = (type) => {
        if ($scope.selectedType == type) {
            return;
        }

        $scope.selectedType = type;
        $scope.filteredOptions = getFiltred($scope.options, type);
    }

    $scope.types = {}

    if (getFiltred($scope.options, 0).length > 0) {
        $scope.types['0'] = 'product_category_type.products';
    };

    if (getFiltred($scope.options, 1).length > 0) {
        $scope.types['1'] = 'product_category_type.services';
    };

    $scope.ngModel = $scope.ngModel.filter(id => !isNaN(parseInt(id)));

    $scope.isChecked = (id) => $scope.ngModel.indexOf(id) != -1;
    $scope.toggleOption = (id) => {
        if ($scope.isChecked(id)) {
            $scope.ngModel = $scope.ngModel.filter(option => option != id);
        } else {
            $scope.ngModel.push(id);
        }
    };

    $scope.filterOptions(Object.keys($scope.types)[0]);
};

module.exports = () => {
    return {
        scope: {
            ngModel: '=',
            options: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            ProductCategoriesControlDirective
        ],
        templateUrl: 'assets/tpl/directives/product-categories-control.html'
    };
};