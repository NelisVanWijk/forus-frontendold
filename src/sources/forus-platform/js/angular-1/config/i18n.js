module.exports = ['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', require('../i18n/i18n-en'));
    $translateProvider.translations('nl', require('../i18n/i18n-nl'));


    $translateProvider.registerAvailableLanguageKeys(['en', 'nl']);

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useLocalStorage();
}];