let MenuScrollToggleDirective = function(scope, element, attributes) {
    let offset_top = 50;

    $(window).unbind('scroll').bind('scroll', function(){
        $(element).length && (
            $(element).offset().top > offset_top ?
            $(element).addClass("top-nav-collapse") :
            $(element).removeClass("top-nav-collapse")
        )
    });

    // TODO temp - must be moved
    $('.form-label').addClass('active');
};

module.exports = () => {
    return {
        restrict: "EA",
        link: MenuScrollToggleDirective
    };
};