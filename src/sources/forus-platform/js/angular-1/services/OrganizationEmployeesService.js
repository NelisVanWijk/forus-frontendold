let OrganizationEmployeesService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';

    return new(function() {
        this.list = function(employee_id) {
            return ApiRequest.get(
                uriPrefix + employee_id + '/employees'
            );
        };

        this.store = function(employee_id, values) {
            return ApiRequest.post(
                uriPrefix + employee_id + '/employees', values
            );
        };

        this.update = function(employee_id, id, values) {
            return ApiRequest.patch(
                uriPrefix + employee_id + '/employees/' + id, values
            );
        };

        this.read = function(employee_id, id) {
            return ApiRequest.get(
                uriPrefix + employee_id + '/employees/' + id
            );
        }

        this.destroy = function(employee_id, id) {
            return ApiRequest.delete(
                uriPrefix + employee_id + '/employees/' + id
            );
        }

        this.apiResourceToForm = function(apiResource) {
            return {
                'roles': Array.isArray(apiResource.roles) ? apiResource.roles.map(role => role.id) : []
            };
        };
    });
};

module.exports = [
    'ApiRequest',
    OrganizationEmployeesService
];