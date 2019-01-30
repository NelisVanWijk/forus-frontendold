module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        return new(function() {
            this.checkCode = function(code) {
                return ApiRequest.get('/vouchers/' + code);
            };

            this.makeTransaction = function(code, values) {
                return ApiRequest.post('/vouchers/' + code + '/transactions', values);
            };

            this.markTransactionForRefund = function(code, transaction, values) {
                var values = JSON.parse(JSON.stringify(values));

                values._method = 'PUT';
                
                return ApiRequest.post('/vouchers/' + code + '/transactions/' + transaction + '/refund');
            };

            this.getTransactions = function(code) {
                return ApiRequest.get('/vouchers/' + code + '/transactions');
            }
        });
    }
];