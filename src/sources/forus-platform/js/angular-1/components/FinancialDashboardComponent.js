let FinancialDashboardComponent = function(
    $state,
    $stateParams,
    FundService
) {
    let $ctrl = this;

    $ctrl.chartData = {
        request: {
            type: "month",
            nth: moment().month() + 1,
            year: moment().year(),
        },
        response: {},
        stringTitle: "",
        changeType: function(type) {
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
        increase: function() {
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
        updateTitle: function() {
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

            if (!$ctrl.fund) {
                return;
            }

            FundService.readFinances(
                $ctrl.fund.organization_id,
                $ctrl.fund.id,
                $ctrl.chartData.request
            ).then(function (res) {
                $ctrl.chartData.response = res.data;
            });
        }
    };

    $ctrl.$onInit = function () {
        $ctrl.emptyBlockLink = $state.href('funds-create', $stateParams);

        $ctrl.chartData.update();

        if (Array.isArray($ctrl.fundProviders)) {
            $ctrl.fundProviders = $ctrl.fundProviders.map(fundProvider => {
                fundProvider.organization.fundCategories = fundProvider.organization.product_categories.map(category => {
                    return category.name;
                });

                return fundProvider;
            });
        }

        if (Array.isArray($ctrl.funds)) {
            $ctrl.funds.forEach(fund => {
                fund.fundCategories = _.pluck(fund.product_categories, 'name').join(', ');
            });
        }

        if ($ctrl.fund) {
            $ctrl.fund.fundCategories = _.pluck($ctrl.fund.product_categories, 'name').join(', ');
        }
    };
};

module.exports = {
    bindings: {
        fund: '<',
        funds: '<',
        fundProviders: '<'
    },
    controller: [
        '$state',
        '$stateParams',
        'FundService',
        FinancialDashboardComponent
    ],
    templateUrl: 'assets/tpl/pages/financial-dashboard.html'
};