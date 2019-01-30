let MenuValidatorDirective = function() {};

module.exports = () => {
    return {
        restrict: "EA",
        replace: true,
        controller: [
            MenuValidatorDirective
        ],
        templateUrl: 'assets/tpl/directives/menu-validator.html' 
    };
};