let RadialChartDirective = function($scope, $element, $filter) {
    let $target = $element.find('.chart-radial-canvas')[0];

    let draw = function() {
        $target.innerHTML = '';

        let ratio = $scope.value / $scope.total;
        let bar = new ProgressBar.Circle($target, {
            strokeWidth: 2,
            trailWidth: 2,
            color: '#2cc6ab',
            text: {
                // Initial value for text.
                // Default: null
                value: $filter('to_fixed')(ratio * 100, 2) + ('%'),
                style: {
                    // Text color.
                    color: '#282b39',
                    // Default: same as stroke color (options.color)
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    padding: 0,
                    margin: 0,
                    // You can specify styles which will be browser prefixed
                    transform: {
                        prefix: true,
                        value: 'translate(-50%, -50%)'
                    }
                }
            }
        });

        bar.text.style.fontFamily = "'Montserrat', sans-serif";

        if ($scope.size == 'sm') {
            bar.text.style.fontSize = '12px';
            bar.text.style.fontWeight = '500';
        } else {
            bar.text.style.fontSize = '24px';
            bar.text.style.fontWeight = '500';
        }

        bar.set(ratio);
    };

    $scope.$watch('total', draw);
    $scope.$watch('value', draw);
};

module.exports = () => {
    return {
        scope: {
            total: '=',
            value: '=',
            size: '@',
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$element',
            '$filter',
            RadialChartDirective
        ],
        templateUrl: 'assets/tpl/directives/radial-chart.html' 
    };
};