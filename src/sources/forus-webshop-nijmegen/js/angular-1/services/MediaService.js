let MediaService = function(ApiRequest) {
    let uriPrefix = '/medias';

    return new (function() {
        this.list = function() {
            return ApiRequest.get(
                uriPrefix
            );
        };

        this.store = function(type, file) {
            var formData = new FormData();

            formData.append('file', file);
            formData.append('type', type);

            return ApiRequest.post(uriPrefix, formData, {
                'Content-Type': undefined
            });
        };

        this.read = function(id) {
            return ApiRequest.get(
                uriPrefix + '/' + id
            );
        }

        this.delete = function(id) {
            return ApiRequest.delete(
                uriPrefix + '/' + id
            );
        }
    });
};

module.exports = [
    'ApiRequest',
    MediaService
];