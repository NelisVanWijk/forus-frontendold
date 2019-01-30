let ValidatorRequestService = function(ApiRequest) {
    let uriPrefix = '/platform/validator-requests';

    return new (function() {
        this.list = function(state) {
            return ApiRequest.get(uriPrefix, state ? {
                state: state
            } : undefined);
        };

        this.read = function(id) {
            return ApiRequest.get(
                uriPrefix + '/' + id
            );
        };

        this.requestValidation = function(validator_id, record_id) {
            return ApiRequest.post(uriPrefix, {
                validator_id: validator_id,
                record_id: record_id
            });
        };
    });
};

module.exports = [
    'ApiRequest',
    ValidatorRequestService
];