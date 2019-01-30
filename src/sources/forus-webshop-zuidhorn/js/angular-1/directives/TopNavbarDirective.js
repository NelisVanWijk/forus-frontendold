let TopNavbarDirective = function($scope) {

};

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
            TopNavbarDirective
        ],
        templateUrl: 'assets/tpl/directives/top-navbar.html' 
    };
};