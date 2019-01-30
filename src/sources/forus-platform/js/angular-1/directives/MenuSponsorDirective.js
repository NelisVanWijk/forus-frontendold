let MenuSponsorDirective = function() {};

module.exports = () => {
    return {
        restrict: "EA",
        replace: true,
        controller: [
            MenuSponsorDirective
        ],
        templateUrl: 'assets/tpl/directives/menu-sponsor.html' 
    };
};