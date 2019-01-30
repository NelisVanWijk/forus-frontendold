setTimeout(() => {
    $('.nano').nanoScroller({
        iOSNativeScrolling: true
    });

    $('.nano.nano-scrolldown').nanoScroller({
        iOSNativeScrolling: true,
        scroll: 'bottom'
    });
}, 500);

$.prototype.collapse = function(cfg) {
    if (this.lenth == 0) {
        return;
    }

    let collapse = function($root) {
        $root.find('[collapse-header]').unbind('click').bind('click', function() {
            $(this).closest('[collapse-item]').toggleClass('active');
        });
    };

    for (let i = 0; i < this.length; i++) {
        new collapse($(this[i]));
    }
};

$('[collapse]').collapse();