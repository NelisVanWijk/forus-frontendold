let BlockEmptyDirective = function($scope) {

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
            BlockEmptyDirective
        ],
        templateUrl: 'assets/tpl/directives/blocks/block-empty.html'
    };
};