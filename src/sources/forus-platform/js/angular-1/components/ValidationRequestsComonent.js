let ValidationRequestsComonent = function(
    $state,
    ValidatorRequestService,
    appConfigs
) {
    if (!appConfigs.features.validationRequests) {
        return $state.go('csv-validation');
    }

    let $ctrl = this;

    let statePriority = {
        pending: 1,
        approved: 0,
        declined: -1
    };

    $ctrl.shownUsers = {};

    let reloadRequests = () => {
        ValidatorRequestService.list().then(function(res) {
            $ctrl.validatorRequests = res.data.data;
            init();
        }, console.error);
    };

    let init = () => {
        let byBsn = {};
        let bsnCollection = [];

        $ctrl.validatorRequests.forEach(request => {
            if (!byBsn[request.bsn]) {
                byBsn[request.bsn] = {
                    requests: []
                };

                bsnCollection.push(request.bsn);
            }

            byBsn[request.bsn].requests.push(request);
        });

        bsnCollection.forEach(function(bsn) {
            byBsn[bsn].requests.sort(((a, b) => {
                return statePriority[a.state] - statePriority[b.state];
            })).reverse();
        });

        for (var prop in byBsn) {
            let byBsnItem = byBsn[prop];
            let requests = byBsnItem.requests;

            byBsnItem.nth = {
                approved: requests.filter((request) => request.state == 'approved').length,
                declined: requests.filter((request) => request.state == 'declined').length,
                pending: requests.filter((request) => request.state == 'pending').length,
            };
        }

        $ctrl.validatorRequestsByBsn = Object.values(byBsn).map(function(byBsnRow) {
            byBsnRow.bsn = byBsnRow.requests[0].bsn;
            return byBsnRow;
        });

        $ctrl.validatorRequestsByBsn.sort(((a, b) => {
            return a.nth.pending > 0 ? 1 : -1;
        })).reverse();
    };

    $ctrl.$onInit = function() {
        init();

        $ctrl.validateAll = function(request) {
            let requests = request.requests.filter((request) => {
                return request.state == 'pending';
            }).map(function(request) {
                return ValidatorRequestService.approve(request.id);
            });

            Promise.all(requests).then(() => reloadRequests());
        };

        $ctrl.declineAll = function(request) {
            let requests = request.requests.filter((request) => {
                return request.state == 'pending';
            }).map(function(request) {
                return ValidatorRequestService.decline(request.id);
            });

            Promise.all(requests).then(() => reloadRequests());
        };
    };
};

module.exports = {
    bindings: {
        validatorRequests: '<'
    },
    controller: [
        '$state',
        'ValidatorRequestService',
        'appConfigs',
        ValidationRequestsComonent
    ],
    templateUrl: 'assets/tpl/pages/validation-requests.html'
};