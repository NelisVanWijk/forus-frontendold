let FundsComponent = function(
    $state,
    FundService,
    appConfigs
) {
    let $ctrl = this;

    if (!appConfigs.features || !appConfigs.features.funds.list) {
        return $state.go('home');
    }

    $ctrl.recordsByKey = {};
    $ctrl.recordsByTypesKey = {};
    $ctrl.countInvalid = 0;

    $ctrl.checkStates = function(isValid) {
        if (!isValid) {
            $ctrl.countInvalid++;
        }
    };

    $ctrl.$onInit = function() {
        if ($ctrl.vouchers.filter(voucher => {
            return voucher.fund_id == $ctrl.fund.id;
        }).length > 0) {
            return $state.go('home');
        }

        $ctrl.records.forEach(function(record) {
            if (!$ctrl.recordsByKey[record.key]) {
                $ctrl.recordsByKey[record.key] = [];
            }

            $ctrl.recordsByKey[record.key].push(record);
        });

        $ctrl.recordTypes.forEach(function(recordType) {
            $ctrl.recordsByTypesKey[recordType.key] = recordType;
        });
    };

    $ctrl.applyFund = function() {
        FundService.apply($ctrl.fund.id).then(function(res) {
            $state.go('voucher', res.data.data);
        }, console.error);
    };
};

module.exports = {
    bindings: {
        fund: '<',
        records: '<',
        vouchers: '<',
        recordTypes: '<',
    },
    controller: [
        '$state',
        'FundService',
        'appConfigs',
        FundsComponent
    ],
    templateUrl: 'assets/tpl/pages/fund-apply.html'
};