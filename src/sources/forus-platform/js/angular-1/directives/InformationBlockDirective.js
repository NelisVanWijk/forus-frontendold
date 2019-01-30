let InformationBlockDirective = function(
    $scope,
    $filter
) {
    $scope.additionalClass = 'information-block-' + ($scope.type ? $scope.type : 'info');
    $scope.text = $filter('translate')($scope.text);
};

module.exports = () => {
    return {
        scope: {
            text: '<',
            type: '<'
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$filter',
            InformationBlockDirective
        ],
        templateUrl: 'assets/tpl/directives/information-block.html'
    };
};