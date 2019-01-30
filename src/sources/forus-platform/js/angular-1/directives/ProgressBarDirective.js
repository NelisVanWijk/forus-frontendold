let ProgressBarDirective = function(
    $scope
) {
    this.$onInit = function() {}
};

module.exports = () => {
    return {
        scope: {
            progress: '=',
            status: '=',
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            ProgressBarDirective
        ],
        templateUrl: 'assets/tpl/directives/progress-bar.html' 
    };
};