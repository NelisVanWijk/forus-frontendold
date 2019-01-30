let FundCardProviderCanJoinDirective = function(
    $scope, 
    $state,
    $filter,
    FundService, 
    ProviderFundService,
    ModalService
) {
    $scope.fundCategories = $scope.fund.product_categories.map((val) => {
        return val.name;
    });

    $scope.providerApplyFund = function(fund) {

        ProviderFundService.applyForFund(
            $scope.organization.id, 
            $scope.fund.id
        ).then(function(res) {

            ModalService.open('modalNotification', {
                type: 'info',
                title: $filter('translate')('provider_funds_available.applied_for_fund.title'),
                description: $filter('translate')('provider_funds_available.applied_for_fund.description'),
                icon: 'fund_applied',
                closeBtnText: $filter('translate')('modal.buttons.confirm'),
            }, {
                onClose: () => $scope.fund.applied = true
            });
        });
    };
};

module.exports = () => {
    return {
        scope: {
            organization: '=',
            fund: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$state',
            '$filter',
            'FundService',
            'ProviderFundService',
            'ModalService',
            FundCardProviderCanJoinDirective
        ],
        templateUrl: 'assets/tpl/directives/fund-card-provider-can-join.html'
    };
};