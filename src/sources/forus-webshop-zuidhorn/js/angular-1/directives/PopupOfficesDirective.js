let PopupOfficesDirective = function(
    $state,
    $scope,
    OfficeService,
    ProductCategoryService
) {
    $scope.selectedOffice = false;
    $scope.productCategories || [];

    $scope.selectedCategories = [];

    $scope.per_page = 7;
    $scope.cur_page = 1;

    $scope.getCategories = (cur_page, per_page) => {
        return $scope.productCategories ? $scope.productCategories.slice(
            per_page * (cur_page - 1),
            per_page * cur_page
        ) : [];
    };

    $scope.isLast = () => {
        return $scope.getCategories($scope.cur_page + 1, $scope.per_page).length == 0;
    };

    $scope.prevCategoriesPage = () => {
        if ($scope.cur_page > 1) {
            $scope.cur_page--;
        }
    };

    $scope.nextCategoriesPage = () => {
        if (!$scope.isLast()) {
            $scope.cur_page++;
        }
    };

    $scope.$watch('popup.show', function(show) {
        if (show) {
            if (!$scope.productCategories) {
                ProductCategoryService.list().then(res => {
                    $scope.productCategories = res.data.data;

                });
            }

            if (!$scope.offices) {
                OfficeService.list().then(res => {
                    $scope.offices = res.data.data;
                    $scope.shownOffices = $scope.offices;
                    $scope.providersCount = getCountOfProviders($scope.offices);
                });
            } else {
                $scope.shownOffices = $scope.offices;
                $scope.providersCount = getCountOfProviders($scope.offices);
            }
        }
    });

    let getCountOfProviders = function(offices) {
        return _.uniq(_.pluck(offices, 'organization_id')).length
    };

    $scope.weekDays = OfficeService.scheduleWeekDays();

    $scope.selectCategory = (category) => {
        if ($scope.selectedCategories.indexOf(category.id) !== -1) {
            $scope.shownOffices = $scope.offices;
            $scope.selectedCategories.splice($scope.selectedCategories.indexOf(category.id), 1);
        } else {
            $scope.selectedCategories.push(category.id);
        }

        if ($scope.selectedCategories.length) {

            let offices = $scope.offices.filter(office => {
                return office.organization.product_categories.filter(function(category) {
                    return $scope.selectedCategories.filter(function(selectedCategory) {
                        return category.id == selectedCategory;
                    }).length > 0;
                }).length > 0
            });

            $scope.shownOffices = offices;

            $scope.providersCount = getCountOfProviders(offices);

        } else {
            $scope.shownOffices = $scope.offices;
            $scope.providersCount = getCountOfProviders($scope.offices);
        }

        $scope.selectOffice(false);
    };

    $scope.selectOffice = (office) => {
        $scope.selectedOffice = office ? office.id : office;
    };
};

module.exports = () => {
    return {
        scope: {
            popup: '=',
            productCategories: '=?'
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$state',
            '$scope',
            'OfficeService',
            'ProductCategoryService',
            PopupOfficesDirective
        ],
        templateUrl: 'assets/tpl/directives/popup-offices.html'
    };
};