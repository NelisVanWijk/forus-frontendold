let LinearChartDirective = function($scope, $element) {
    var timeFormat = 'MM/DD/YYYY';

    $scope.$watch('data', function(data) {
        drawChart(data ? data : []);
    });

    let drawChart = (data) => {
        let labels = [];
        let values = [];

        data.forEach(value => {
            labels.push(moment(value.key, "YYYY-MM-DD").toDate());
            values.push({
                x: moment(value.key, "YYYY-MM-DD"),
                y: value.value,
            });
        });


        new Chart($element, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    borderColor: '#2987fd',
                    backgroundColor: 'transparent'
                }]
            },
            options: {
                fill: false,
                legend: {
                    display: false
                },
                time: {
                    parser: timeFormat
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'll',
                            displayFormats: {
                                quarter: 'll',
                            }
                        }
                    }]
                },
            }
        });
    };

    drawChart([]);
};

module.exports = () => {
    return {
        scope: {
            data: '=',
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$element',
            LinearChartDirective
        ],
        templateUrl: 'assets/tpl/directives/linear-chart.html' 
    };
};