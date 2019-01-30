let ScheduleControlDirective = function($scope, OfficeService) {
    $scope.week_days = OfficeService.scheduleWeekDays();
    $scope.day_times = OfficeService.scheduleDayTimes();
};

module.exports = () => {
    return {
        scope: {
            ngModel: '=',
            options: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            'OfficeService',
            ScheduleControlDirective
        ],
        templateUrl: 'assets/tpl/directives/schedule-control.html' 
    };
};