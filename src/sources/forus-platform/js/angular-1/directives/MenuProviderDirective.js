let MenuProviderDirective = function() {};

module.exports = () => {
    return {
        restrict: "EA",
        replace: true,
        controller: [
            MenuProviderDirective
        ],
        templateUrl: 'assets/tpl/directives/menu-provider.html' 
    };
};