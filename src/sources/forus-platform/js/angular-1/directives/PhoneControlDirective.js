let PhoneControlDirective = function(
    $scope,
    $timeout
) {
    $scope.$watch('ngModel', function() {
        $scope.filler = new Array(
            10 - ($scope.ngModel ? ($scope.ngModel.toString().length) : 0)
        );
    });

    $scope.cantDeleteLength = $scope.cantDeleteLength ? $scope.cantDeleteLength : 0;

    $('body').bind('keydown', (e) => {
        $timeout(function() {
            var key = e.charCode || e.keyCode || 0;

            if (key == 8 || key == 46) {
                if($scope.ngModel.length - $scope.cantDeleteLength > 0) {
                    $scope.ngModel = $scope.ngModel.slice(0, $scope.ngModel.length - 1);
                }
            }

            if ((key >= 48 && key <= 57)) {
                if (!$scope.ngModel) {
                    $scope.ngModel = '';
                }

                if ($scope.ngModel.length < 10) {
                    $scope.ngModel += (key - 48).toString();
                }
            }

            if ((key >= 96 && key <= 105)) {
                if (!$scope.ngModel) {
                    $scope.ngModel = '';
                }

                if ($scope.ngModel.length < 10) {
                    $scope.ngModel += (key - 96).toString();
                }
            }
        }, 0);
    });
};

module.exports = () => {
    return {
        scope: {
            ngModel: '=',
            cantDeleteLength: '=?'
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$timeout',
            PhoneControlDirective
        ],
        templateUrl: 'assets/tpl/directives/phone-control.html'
    };
};