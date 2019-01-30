module.exports = [
    '$transitions',
    '$filter',
    '$rootScope',
    function(
        $transitions,
        $filter,
        $rootScope
    ) {
        $transitions.onSuccess({}, function(transition) {
            let pageTitleKey = 'page_state_titles.' + transition.to().name;
            let pageTitleText = $filter('translate')(pageTitleKey);

            if (pageTitleKey == pageTitleText) {
                pageTitleText = $filter('translate')('page_title');
            }

            $rootScope.pageTitle = pageTitleText;

            document.body.scrollTop = document.documentElement.scrollTop = 0;
        })
    }
];