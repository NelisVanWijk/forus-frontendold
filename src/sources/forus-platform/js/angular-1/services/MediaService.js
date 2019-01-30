let MediaService = function(
    ApiRequest,
    appConfigs
) {
    let uriPrefix = '/medias';

    return new(function() {
        this.list = function() {
            return ApiRequest.get(
                uriPrefix
            );
        };

        this.store = function(type, file) {
            let formData = new FormData();

            formData.append('file', file, file['name']);
            formData.append('type', type);

            return ApiRequest.post(uriPrefix, formData, {
                'Content-Type': undefined
            });
        };

        this.read = function(id) {
            return ApiRequest.get(
                uriPrefix + '/' + id
            );
        };

        this.delete = function(id) {
            return ApiRequest.delete(
                uriPrefix + '/' + id
            );
        };

        this.configByType = (type) => {
            return appConfigs.features.media[type];
        };
    });
};

module.exports = [
    'ApiRequest',
    'appConfigs',
    MediaService
];