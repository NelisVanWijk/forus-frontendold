let ContactFormDirective = function($scope) {
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
            ContactFormDirective
        ],
        templateUrl: 'assets/tpl/directives/contact-form.html' 
    };
};