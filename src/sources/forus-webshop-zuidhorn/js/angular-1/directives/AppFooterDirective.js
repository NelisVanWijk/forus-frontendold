let FooterDirective = function($scope, $timeout) {
    $timeout(() => $scope.displayFooter = true, 1000);
};

module.exports = () => {
    return {
        scope: {},
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$timeout',
            FooterDirective
        ],
        templateUrl: 'assets/tpl/directives/app-footer.html' 
    };
};