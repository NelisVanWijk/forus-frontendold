let TooltipDirective = function(
    $q,
    $scope,
    $element,
    $filter
) {
    $scope.text = $filter('translate')($scope.text);
};

module.exports = () => {
    return {
        scope: {
            'text': '<'
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$q',
            '$scope',
            '$element',
            '$filter',
            TooltipDirective
        ],
        templateUrl: 'assets/tpl/directives/tooltip-directive.html'
    };
};