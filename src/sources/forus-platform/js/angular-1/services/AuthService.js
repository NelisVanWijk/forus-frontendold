module.exports = [
    'ApiRequest',
    'CredentialsService',
    'IdentityService',
    function(
        ApiRequest,
        CredentialsService,
        IdentityService
    ) {
        let subscriptions = {};

        return new(function() {
            this.hasCredentials = () => {
                return !!CredentialsService.get();
            };

            this.on = (action, callback) => {
                if (!subscriptions[action]) {
                    subscriptions[action] = [];
                }

                subscriptions[action].push(callback);
            };


            this.signIn = function(values) {
                return new Promise(function(resolve, reject) {
                    ApiRequest.post('/shop-keepers/devices', values).then((res) => {
                        if (subscriptions.signIn && Array.isArray(subscriptions.signIn)) {
                            subscriptions.signIn.forEach((callback) => {
                                callback();
                            });
                        }

                        resolve(res);
                    }, reject);
                });
            };

            this.signOut = function() {
                CredentialsService.set(null);

                if (subscriptions.signIn && Array.isArray(subscriptions.signOut)) {
                    subscriptions.signOut.forEach((callback) => {
                        callback();
                    });
                }
            };

            this.identity = function(credentails) {
                if (CredentialsService.get()) {
                    return IdentityService.identity();
                }
                
                return new Promise(function(resolve, reject) {
                    resolve(null);
                });
            };
        });
    }
];