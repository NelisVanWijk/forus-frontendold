let EmptyBlockDirective = function($scope) {

};

module.exports = () => {
    return {
        scope: {
            title: '@',
            description: '@'
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            EmptyBlockDirective
        ],
        templateUrl: 'assets/tpl/directives/empty-block.html' 
    };
};