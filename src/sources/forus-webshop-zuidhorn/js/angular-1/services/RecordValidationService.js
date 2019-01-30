module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new(function() {
            this.store = function(values) {
                return ApiRequest.post('/identity/record-validations', values);
            };
            
            this.read = function(uuid) {
                return ApiRequest.get('/identity/record-validations/' + uuid);
            }

            this.approve = function(uuid) {
                return ApiRequest.patch('/identity/record-validations/' + uuid + '/approve');
            }

            this.decline = function(uuid) {
                return ApiRequest.patch('/identity/record-validations/' + uuid + '/decline');
            }
        });
    }
];