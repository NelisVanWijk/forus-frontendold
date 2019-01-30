module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new(function() {
            this.list = function() {
                return ApiRequest.get('/identity/record-categories');
            };

            this.store = function(values) {
                return ApiRequest.post('/identity/record-categories', values);
            };

            this.update = function(id, values) {
                return ApiRequest.patch('/identity/record-categories/' + id, values);
            };

            this.delete = function(id) {
                return ApiRequest.delete('/identity/record-categories/' + id);
            };
        });
    }
];