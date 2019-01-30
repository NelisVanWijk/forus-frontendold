let ProfileCardDirective = function(
    $scope,
    $rootScope
) {
    let qrCodeEl = document.getElementById('profile_qr');

    new QRCode(qrCodeEl, {
        text: JSON.stringify({
            type: 'identity',
            value: $rootScope.auth_user.address
        }),
        correctLevel: QRCode.CorrectLevel.L
    });

    qrCodeEl.removeAttribute('title');

    $scope.copyAddress = function() {
        // todo: rewrite 
        let input = $('<input type="text" value="' + $rootScope.auth_user.address + '">');
        $('body').append(input);
        input.select();
        document.execCommand("copy");
        input.remove();
    };
};

module.exports = () => {
    return {
        scope: {},
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$rootScope',
            ProfileCardDirective
        ],
        templateUrl: 'assets/tpl/directives/profile-card.html' 
    };
};