let PaginatorDirective = function(
    $scope,
    $state,
    $attrs,
    $timeout,
    $stateParams
) {
    let countButtons = $scope.countButtons || 5;
    let filterTimeout;
    let initialized;

    let onInit = () => {
        $scope.filters = $stateParams;
        $scope.pages = $scope.getPages();
    };

    $scope.setPage = (page) => {
        let query = {};

        if (typeof($scope.filters) == 'object' && $scope.filters) {
            Object.assign(query, $scope.filters, {
                page: page
            });
        }

        if ($attrs.onPageChange) {
            return $scope.onPageChange({
                query: query
            });
        }

        $state.go($state.$current.name, query);
    };

    $scope.getPages = () => {
        let fromPage = Math.max(1, $scope.meta.current_page - Math.round(countButtons / 2 - 1));
        let pages = []

        if (countButtons > $scope.meta.last_page - fromPage) {
            fromPage = Math.max(1, ($scope.meta.last_page - countButtons) + 1);
        }

        while (pages.length < countButtons && fromPage <= $scope.meta.last_page) {
            pages.push(fromPage++);
        }

        return pages;
    };

    $scope.$watch('filters', () => {
        if (!initialized) {
            return initialized = true;
        }

        $timeout.cancel(filterTimeout);

        filterTimeout = $timeout(() => {
            $scope.setPage($scope.meta.current_page);
        }, 1500);
    }, true);

    $scope.$watch('meta', (cur) => {
        $scope.pages = $scope.getPages();

        if ($scope.meta.current_page > $scope.meta.last_page) {
            $scope.setPage($scope.meta.last_page);
        }
    }, true);

    $scope.$on('$destroy', function() {
        $timeout.cancel(filterTimeout);
    });

    onInit();
};

module.exports = () => {
    return {
        scope: {
            meta: '=',
            filters: '=',
            onPageChange: '&',
            countButtons: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$state',
            '$attrs',
            '$timeout',
            '$stateParams',
            PaginatorDirective
        ],
        templateUrl: 'assets/tpl/directives/paginators/paginator.html'
    };
};