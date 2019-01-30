let RoleService = function(
    ApiRequest
) {
    return new (function() {
        this.list = function() {
            return ApiRequest.get('/platform/roles');
        };
    });
};

module.exports = [
    'ApiRequest',
    RoleService
];