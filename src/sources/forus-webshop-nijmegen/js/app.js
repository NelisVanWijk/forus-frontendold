require("./angular-1/angular-app");

setTimeout(() => {
    $('.nano').nanoScroller({
        iOSNativeScrolling: true 
    });
    
    $('.nano.nano-scrolldown').nanoScroller({
        iOSNativeScrolling: true,
        scroll: 'bottom' 
    });
}, 500);

function onPageLoaded() {

    var OFFSET_TOP = 50;

    $(window).unbind('scroll').bind('scroll', function(){
        $(".block-navbar").length && ($(".block-navbar").offset().top > OFFSET_TOP ? $(".block-navbar").addClass("top-nav-collapse") : $(".block-navbar").removeClass("top-nav-collapse"))
    });

    $('.form-label').addClass('active');
}

$(document).ready(function () {
    onPageLoaded();
});