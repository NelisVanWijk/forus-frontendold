let VoucherCardDirective = function(
    $scope,
    VoucherService,
) {
    $scope.voucherCard = VoucherService.composeCardData($scope.voucher);
};

module.exports = () => {
    return {
        scope: {
            voucher: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            'VoucherService',
            VoucherCardDirective
        ],
        templateUrl: 'assets/tpl/directives/voucher-card.html' 
    };
};