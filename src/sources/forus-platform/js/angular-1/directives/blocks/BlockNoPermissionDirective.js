let BlockNoPermissionDirective = function() {};

module.exports = () => {
    return {
        scope: {
            title: '@',
            description: '@',
        },
        restrict: "EA",
        replace: true,
        controller: [
            BlockNoPermissionDirective
        ],
        templateUrl: 'assets/tpl/directives/blocks/block-no-permission.html' 
    };
};