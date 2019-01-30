let TransactionsComponent = function(
    $state,
    OrganizationService,
    appConfigs
) {
    let $ctrl = this;

    var now = moment().format('YYYY-MM-DD HH:mm');
    var org = OrganizationService.active().id;

    $ctrl.states = {
        pending: 'Pending',
        success: 'Voltooid'
    };

    // Export to CSV file
    $ctrl.exportList = function(e) {
        e && (e.preventDefault() & e.stopPropagation());

        var data = $ctrl.transactions.map(function(row) {
            return {
                date: row.created_at,
                amount: row.amount,
                fund: row.fund.name,
                provider: row.organization.name,
                state: $ctrl.states[row.state],
                payment_id: row.payment_id,
            };
        });

        var file_name = appConfigs.panel_type + '-' + org;
        var file_type = 'text/csv;charset=utf-8;';
        var file_data = Papa.unparse(data);

        var blob = new Blob([file_data], {
            type: file_type,
        });

        saveAs(blob, file_name + '-transactions-' + now + '.csv');
    };

    $ctrl.showTransaction = (transaction) => {
        $state.go('transaction', appConfigs.panel_type == 'sponsor' ? {
            address: transaction.address,
            organization_id: transaction.fund.organization_id
        } : transaction);
    };
};

module.exports = {
    bindings: {
        transactions: '<'
    },
    controller: [
        '$state',
        'OrganizationService',
        'appConfigs',
        TransactionsComponent
    ],
    templateUrl: 'assets/tpl/pages/transactions.html'
};