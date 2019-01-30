let OrganizationEmployeesComponent = function(
    $state,
    ModalService,
    OrganizationEmployeesService
) {
    let $ctrl = this;

    $ctrl.$onInit = function() {
        $ctrl.employees.forEach(employee => {
            employee.rolesList = employee.roles.map(role => role.name).sort(
                (a, b) => a == b ? 0 : (a < b ? -1 : 1)
            ).join(', ');
        });
    };

    $ctrl.createEmployee = () => {
        $ctrl.editEmployee(false);
    };

    $ctrl.editEmployee = (employee) => {
        ModalService.open('employeeEdit', {
            organization: $ctrl.organization,
            roles: $ctrl.roles,
            employee: employee,
            submit: () => {
                $state.reload();
            }
        });
    };

    $ctrl.deleteEmployee = function(employee) {
        OrganizationEmployeesService.destroy(
            employee.organization_id,
            employee.id
        ).then((res) => {
            $state.reload();
        }, console.error);
    }
};

module.exports = {
    bindings: {
        organization: '<',
        roles: '<',
        employees: '<'
    },
    controller: [
        '$state',
        'ModalService',
        'OrganizationEmployeesService',
        OrganizationEmployeesComponent
    ],
    templateUrl: 'assets/tpl/pages/organization-employees.html'
};