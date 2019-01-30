let FundCriterionDirective = function($scope) {
    $scope.validators = $scope.fund.validators.map(function(validator) {
        return validator.identity_address;
    });

    $scope.records = ($scope.records || []).map(function(record) {
        let validated = record.validations.filter(function(validation) {
            return (validation.state == 'approved') && $scope.validators.indexOf(
                validation.identity_address
            ) != -1;
        }).length > 0;

        let validValue = false;

        if ($scope.criterion.operator == '!=') {
            validValue = record.value != $scope.criterion.value;
        } else if ($scope.criterion.operator == '=') {
            validValue = record.value == $scope.criterion.value;
        } else if ($scope.criterion.operator == '>') {
            validValue = record.value > $scope.criterion.value;
        } else if ($scope.criterion.operator == '<') {
            validValue = record.value < $scope.criterion.value;
        } else if ($scope.criterion.operator == '>=') {
            validValue = record.value >= $scope.criterion.value;
        } else if ($scope.criterion.operator == '<=') {
            validValue = record.value <= $scope.criterion.value;
        }

        if (!validValue) {
            record.state = 'addRecord';
        } else if (validated && !validValue) {
            record.state = 'invalid';
        } else if (!validated && validValue) {
            record.state = 'validate';
        } else if (validated && validValue) {
            record.state = 'valid';
        }

        return record;
    });

    if ($scope.records.filter(record => record.state == 'valid').length > 0) {
        $scope.criterion.state = 'valid';
    }

    $scope.updated($scope.criterion.state == 'valid');
};

module.exports = () => {
    return {
        scope: {
            fund: '=',
            criterion: '=',
            recordType: '=',
            records: '=',
            updated: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            FundCriterionDirective
        ],
        templateUrl: 'assets/tpl/directives/fund-criterion.html' 
    };
};