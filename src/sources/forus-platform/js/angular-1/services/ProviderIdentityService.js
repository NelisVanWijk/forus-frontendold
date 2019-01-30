let OrganizationValidatorService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';

    return new(function() {
        this.list = function(organization_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/provider/identities'
            );
        };

        this.store = function(organization_id, values) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/provider/identities', values
            );
        };

        this.update = function(organization_id, id, values) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/provider/identities/' + id, values
            );
        };

        this.read = function(organization_id, id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/provider/identities/' + id
            );
        }

        this.destroy = function(organization_id, id) {
            return ApiRequest.delete(
                uriPrefix + organization_id + '/provider/identities/' + id
            );
        }

        this.apiResourceToForm = function(apiResource) {
            return {
                'identity_address': apiResource.identity_address,
                'email': apiResource.email,
            };
        };
    });
};

module.exports = [
    'ApiRequest',
    OrganizationValidatorService
];