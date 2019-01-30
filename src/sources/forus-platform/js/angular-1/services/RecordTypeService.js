module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new(function() {
            this.list = function() {
                return ApiRequest.get('/identity/record-types');
            };
        });
    }
];