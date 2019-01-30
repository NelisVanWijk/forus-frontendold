module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new (function() {
            this.identity = () => {
                return ApiRequest.get('/identity');
            };

            this.make = (values) => {
                return ApiRequest.post('/identity', values);
            };

            this.makeAuthToken = () => {
                return ApiRequest.post('/identity/proxy/token');
            };

            this.makeAuthPinCode = () => {
                return ApiRequest.post('/identity/proxy/code');
            };

            this.makeAuthEmailToken = (source, primary_email) => {
                return ApiRequest.post('/identity/proxy/email', {
                    source: source,
                    primary_email: primary_email
                });
            };

            this.checkAccessToken = (access_token) => {
                return ApiRequest.get(
                    '/identity/proxy/check-token', {
                        access_token: access_token
                    }
                );
            };

            this.authorizeAuthToken = (auth_token) => {
                return ApiRequest.post('/identity/proxy/authorize/token', {
                    auth_token: auth_token
                });
            };

            this.authorizeAuthCode = (code) => {
                return ApiRequest.post('/identity/proxy/authorize/code', {
                    auth_code: code
                });
            };

            this.authorizeAuthEmailToken = (source, email_token) => {
                return ApiRequest.get('/identity/proxy/authorize/email/' + source + '/' + email_token);
            };
        });
    }
];