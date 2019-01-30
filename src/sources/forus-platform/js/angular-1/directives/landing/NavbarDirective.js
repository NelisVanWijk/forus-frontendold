let LandingNavbarDirective = function($scope) {};

module.exports = () => {
    return {
        scope: {
            text: '=',
            button: '=',
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            LandingNavbarDirective
        ],
        templateUrl: 'assets/tpl/directives/landing/navbar.html' 
    };
};