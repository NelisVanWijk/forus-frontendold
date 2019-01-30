let api_url = "https://dev.api.forus.link/api/v1";

let dashboardConfig = (client_type, client_key, chat_id = false, max_product_count = false) => {
    return {
        api_url: api_url,
        panel_type: client_type,
        chat_id: chat_id,
        client_key: client_key,
        max_product_count: max_product_count
    }
};

let webshopConfig = (client_key) => {
    return {
        api_url: api_url,
        client_key: client_key
    };
};

let markdownConfig = (client_key) => {
    return {
        api_url: api_url,
        client_key: client_key,
    };
};

let platforms_data = {
    // markups
    // "forus-platform-markup": markdownConfig(),

    "forus-landing-meapp.general": markdownConfig('general'),
    "forus-landing-meapp.zuidhorn": markdownConfig('zuidhorn'),
    "forus-landing-meapp.nijmegen": markdownConfig('nijmegen'),

    /* Sponsor dashboards */
    "forus-platform.sponsor.general": dashboardConfig('sponsor', 'general'),
    "forus-platform.sponsor.zuidhorn": dashboardConfig('sponsor', 'zuidhorn'),
    "forus-platform.sponsor.nijmegen": dashboardConfig('sponsor', 'nijmegen'),

    /* Provider dashboards */
    "forus-platform.provider.general": dashboardConfig('provider', 'general', false, 2),
    "forus-platform.provider.zuidhorn": dashboardConfig('provider', 'zuidhorn', false, 2),
    "forus-platform.provider.nijmegen": dashboardConfig('provider', 'nijmegen', false, 2),

    /* Validator dashboards */
    "forus-platform.validator": dashboardConfig('validator', 'general'),

    /* webshop markups */
    // "forus-webshop-general.markup": markdownConfig(),
    // "forus-webshop-zuidhorn.markup": markdownConfig(),
    // "forus-webshop-nijmegen.markup": markdownConfig(),

    /* Webshops */
    "forus-webshop-general.panel": webshopConfig('general'),
    "forus-webshop-zuidhorn.panel": webshopConfig('zuidhorn'),
    "forus-webshop-nijmegen.panel": webshopConfig('nijmegen')
};

module.exports = {
    // browsersync configs
    server: {
        enabled: true,
        // choose, which platform should be served
        // you can serve few platforms at the same time, 
        // but make sure each of them use unique port number
        platform: Object.keys(platforms_data),
        // browsersync reloads browser when watched files are modified,
        // here you can choose which platform besides "served" will make
        // browsersync to reload.
        // Sometimes "served" platform rely on foreign platform
        watch_platforms: "all"
    },
    platforms: {
        // choose which platforms will be enabled, otherwise completely ignored
        enabled: Object.keys(platforms_data)
    },
    platforms_data: platforms_data
};