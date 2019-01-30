let FundCardProviderFinancesDirective = function(
    $scope, 
    $state, 
    FundService
) {
    $scope.one = 1;
    $scope.chartData = {
        request: {
            type: "month",
            nth: moment().month() + 1,
            year: moment().year(),
        },
        response: {},
        stringTitle: "",
        changeType: function (type) {
            this.request.type = type;

            if (this.request.type == 'week') {
                this.request.nth = moment().week();
            } else if (this.request.type == 'month') {
                this.request.nth = moment().month() + 1;
            } else if (this.request.type == 'quarter') {
                this.request.nth = moment().quarter();
            } else if (this.request.type == 'all') {
                this.request.nth = null;
            }

            this.update();
        },
        increase: function () {
            if (this.request.type == 'week') {
                if (this.request.nth == moment().year(this.request.year).weeksInYear()) {
                    this.request.nth = 1;
                    this.request.year++;
                } else {
                    this.request.nth++;
                }
            } else if (this.request.type == 'month') {
                if (this.request.nth == 12) {
                    this.request.nth = 1;
                    this.request.year++;
                } else {
                    this.request.nth++;
                }
            } else if (this.request.type == 'quarter') {
                if (this.request.nth == 4) {
                    this.request.nth = 1;
                    this.request.year++;
                } else {
                    this.request.nth++;
                }
            }

            this.update();
        },
        decrease: function () {
            if (this.request.type == 'week') {
                if (this.request.nth == 1) {
                    this.request.year--;
                    this.request.nth = moment().year(this.request.year).weeksInYear();
                } else {
                    this.request.nth--;
                }
            } else if (this.request.type == 'month') {
                if (this.request.nth == 1) {
                    this.request.nth = 12;
                    this.request.year--;
                } else {
                    this.request.nth--;
                }
            } else if (this.request.type == 'quarter') {
                if (this.request.nth == 1) {
                    this.request.nth = 4;
                    this.request.year--;
                } else {
                    this.request.nth--;
                }
            }

            this.update();
        },
        updateTitle: function () {
            let stringTitle = "";

            if (this.request.type == 'week') {
                stringTitle = this.request.nth + ' Week ' + this.request.year;
            } else if (this.request.type == 'month') {
                stringTitle = moment.months(this.request.nth - 1) + ' ' + this.request.year;
            } else if (this.request.type == 'quarter') {
                stringTitle = 'Kwartaal: Q' + this.request.nth + ' ' + this.request.year;
            } else if (this.request.type == 'all') {
                stringTitle = 'Totaal';
            }

            this.stringTitle = stringTitle;
        },
        update: function () {
            this.updateTitle();

            FundService.readProvidersFinances(
                $scope.fundProvider.fund.organization_id,
                $scope.fundProvider.fund.id,
                $scope.fundProvider.id,
                $scope.chartData.request
            ).then(function (res) {
                $scope.chartData.response = res.data;
            });
        }
    };

    $scope.fund = $scope.fundProvider.fund;
    $scope.fundCategories = $scope.fund.product_categories.map((val) => {
        return val.name;
    });

    $scope.showTransaction = (transaction) => {
        $state.go('transaction', {
            address: transaction.address,
            organization_id: transaction.fund.organization_id
        });
    };

    $scope.toggleDetails = function(type) {
        if (type == 'transactions') {
            FundService.readProvidersTransactions(
                $scope.fundProvider.fund.organization_id,
                $scope.fundProvider.fund.id,
                $scope.fundProvider.id
            ).then(function (res) {
                $scope.fundProvider.showStatistics = false;
                $scope.fundProvider.showTransactions = true;
                $scope.transactions = res.data.data;
            });
        } else {
            $scope.chartData.update();
            $scope.fundProvider.showStatistics = true;
            $scope.fundProvider.showTransactions = false;
        }
    };
};

module.exports = () => {
    return {
        scope: {
            fundProvider: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$state',
            'FundService',
            FundCardProviderFinancesDirective
        ],
        templateUrl: 'assets/tpl/directives/fund-card-provider-finances.html' 
    };
};