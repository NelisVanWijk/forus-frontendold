let ValidatorRequestService = function(ApiRequest) {
    let uriPrefix = '/platform/validator/validator-requests';

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
        }

        this.approve = function(id) {
            return ApiRequest.patch(
                uriPrefix + '/' + id, {
                    state: 'approved'
                }
            );
        };

        this.decline = function(id) {
            return ApiRequest.patch(
                uriPrefix + '/' + id, {
                    state: 'declined'
                }
            );
        };
    });
};

module.exports = [
    'ApiRequest',
    ValidatorRequestService
];