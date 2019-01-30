let NoPermissionComonent = function() {
    this.$onInit = () => {};
};

module.exports = {
    bindings: {
        message: '<'
    },
    controller: [
        '$scope',
        NoPermissionComonent
    ],
    templateUrl: 'assets/tpl/pages/no-permission.html'
};