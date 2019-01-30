let CollapseDirective = function(scope, element, attributes) {
    $(element).find('[collapse-header]').unbind('click').bind('click', function() {
        $(this).closest('[collapse-item]').toggleClass('active');
    });
};

module.exports = () => {
    return {
        restrict: "EA",
        link: CollapseDirective 
    };
};