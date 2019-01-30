let ModalOfficesComponent = function(
    OfficeService,
    ProductCategoryService
) {
    let $ctrl = this;

    $ctrl.selectedOffice = false;
    $ctrl.selectedCategories = [];
    $ctrl.productCategories = [];

    $ctrl.per_page = 7;
    $ctrl.cur_page = 1;

    $ctrl.getCategories = (cur_page, per_page) => {
        return $ctrl.productCategories.slice(
            per_page * (cur_page - 1),
            per_page * cur_page
        );
    };

    $ctrl.isLast = () => {
        return $ctrl.getCategories($ctrl.cur_page + 1, $ctrl.per_page).length == 0;
    };

    $ctrl.prevCategoriesPage = () => {
        if ($ctrl.cur_page > 1) {
            $ctrl.cur_page--;
        }
    };

    $ctrl.nextCategoriesPage = () => {
        if (!$ctrl.isLast()) {
            $ctrl.cur_page++;
        }
    };

    $ctrl.$onInit = () => {
        ProductCategoryService.list().then(res => {
            $ctrl.productCategories = res.data.data;
        });

        OfficeService.list().then(res => {
            $ctrl.offices = res.data.data;
            $ctrl.shownOffices = $ctrl.offices;
            $ctrl.providersCount = getCountOfProviders($ctrl.offices);
        });
    };

    let getCountOfProviders = function(offices) {
        return _.uniq(_.pluck(offices, 'organization_id')).length
    };

    $ctrl.weekDays = OfficeService.scheduleWeekDays();

    $ctrl.selectCategory = (category) => {
        if ($ctrl.selectedCategories.indexOf(category.id) !== -1) {
            $ctrl.shownOffices = $ctrl.offices;
            $ctrl.selectedCategories.splice($ctrl.selectedCategories.indexOf(category.id), 1);
        } else {
            $ctrl.selectedCategories.push(category.id);
        }

        if ($ctrl.selectedCategories.length) {

            let offices = $ctrl.offices.filter(office => {
                return office.organization.product_categories.filter(function(category) {
                    return $ctrl.selectedCategories.filter(function(selectedCategory) {
                        return category.id == selectedCategory;
                    }).length > 0;
                }).length > 0
            });

            $ctrl.shownOffices = offices;

            $ctrl.providersCount = getCountOfProviders(offices);

        } else {
            $ctrl.shownOffices = $ctrl.offices;
            $ctrl.providersCount = getCountOfProviders($ctrl.offices);
        }

        $ctrl.selectOffice(false);
    };

    $ctrl.selectOffice = (office) => {
        $ctrl.selectedOffice = office ? office.id : office;
    };

    $ctrl.cancel = () => {
        if (typeof($ctrl.modal.scope.cancel) === 'function') {
            $ctrl.modal.scope.cancel();
        }

        $ctrl.close();
    };

    $ctrl.$onDestroy = function() {};
};

module.exports = {
    bindings: {
        close: '=',
        modal: '='
    },
    controller: [
        'OfficeService',
        'ProductCategoryService',
        ModalOfficesComponent
    ],
    templateUrl: () => {
        return 'assets/tpl/modals/modal-offices.html';
    }
};