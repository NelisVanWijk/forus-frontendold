module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new (function() {
            this.send = (values) => {
                return ApiRequest.post('/platform/sms/send', values);
            };
        });
    }
];