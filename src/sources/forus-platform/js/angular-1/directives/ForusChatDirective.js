let ForusChatDirective = function(scope, element, attributes) {
    element.append(`
    <script>(function(w, d, s, u) {
            w.RocketChat = function(c) {
                w.RocketChat._.push(c)
            };
            w.RocketChat._ = [];
            w.RocketChat.url = u;
            var h = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
            j.async = true;
            j.src = 'https://chat.forus.io/packages/rocketchat_livechat/assets/rocketchat-livechat.min.js?_=` + 
            attributes.chatId + `';
            h.parentNode.insertBefore(j, h);
        })(window, document, 'script', 'https://chat.forus.io/livechat'); 
    </script>
    `);
};

module.exports = () => {
    return {
        restrict: "EA",
        link: ForusChatDirective 
    };
};