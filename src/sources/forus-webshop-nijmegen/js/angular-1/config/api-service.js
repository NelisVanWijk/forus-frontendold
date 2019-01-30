module.exports = ['ApiRequestProvider', 'appConfigs', function(ApiRequestProvider, appConfigs) {
    ApiRequestProvider.setHost(appConfigs.api_url);
}];