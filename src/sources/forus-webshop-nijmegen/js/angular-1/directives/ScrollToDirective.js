let ScrollToDirective = function(scope, element, attributes) {
    $(element).bind('click', function() {
        $('html, body').animate({
            scrollTop: $(attributes.scrollTo).offset().top
        }, 2000);
    });
};

module.exports = () => {
    return {
        restrict: "EA",
        link: ScrollToDirective
    };
};