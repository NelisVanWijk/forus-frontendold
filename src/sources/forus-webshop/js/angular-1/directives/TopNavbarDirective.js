let TopNavbarDirective = function(
    $scope,
    ModalService
) {
    $scope.openAuthPopup = function () {
        ModalService.open('modalAuth', {});
    };

    $scope.openPinCodePopup = function () {
        ModalService.open('modalPinCode', {});
    };

    $scope.openActivateCodePopup = function () {
        ModalService.open('modalActivateCode', {});
    };

    $scope.openAuthCodePopup = function () {
        ModalService.open('modalAuthCode', {});
    };
};

module.exports = () => {
    return {
        scope: {
            text: '=',
            button: '=',
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            'ModalService',
            TopNavbarDirective
        ],
        templateUrl: 'assets/tpl/directives/top-navbar.html' 
    };
};