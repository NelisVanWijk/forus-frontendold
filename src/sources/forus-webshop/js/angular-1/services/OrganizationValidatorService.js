let OrganizationValidatorService = function(ApiRequest) {
    let uriPrefix = '/platform/organizations/';

    return new(function() {
        this.list = function(organization_id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/validators'
            );
        };

        this.store = function(organization_id, values) {
            return ApiRequest.post(
                uriPrefix + organization_id + '/validators', values
            );
        };

        this.update = function(organization_id, id, values) {
            return ApiRequest.patch(
                uriPrefix + organization_id + '/validators/' + id, values
            );
        };

        this.read = function(organization_id, id) {
            return ApiRequest.get(
                uriPrefix + organization_id + '/validators/' + id
            );
        }

        this.destroy = function(organization_id, id) {
            return ApiRequest.delete(
                uriPrefix + organization_id + '/validators/' + id
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