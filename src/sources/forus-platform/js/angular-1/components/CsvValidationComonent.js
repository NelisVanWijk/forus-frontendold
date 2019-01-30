let CsvValidationComonent = function(
    $scope
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {};

    $ctrl.$onInit = function() {
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
        prevalidations: '<',
        recordTypes: '<',
        funds: '<',
        fund: '<',
    },
    controller: [
        '$scope',
        CsvValidationComonent
    ],
    templateUrl: 'assets/tpl/pages/csv-validation.html'
};