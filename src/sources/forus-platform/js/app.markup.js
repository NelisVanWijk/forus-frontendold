setTimeout(() => {
    $('.nano').nanoScroller({
        iOSNativeScrolling: true
    });

    $('.nano.nano-scrolldown').nanoScroller({
        iOSNativeScrolling: true,
        scroll: 'bottom'
    });
}, 500);

let demoLinearChart = "[demo-linear-chart]";
let demoRadialChart = "[demo-radial-chart]";

$.prototype.demoLinearChart = function () {
    let demoLinearChart = function ($element) {
        var timeFormat = 'MM/DD/YYYY';

        new Chart($element[0], {
            type: 'line',
            data: {
                labels: [
                    moment("2018-09-10", "YYYY-MM-DD").toDate(),
                    moment("2018-09-15", "YYYY-MM-DD").toDate(),
                    moment("2018-09-16", "YYYY-MM-DD").toDate(),
                    moment("2018-09-17", "YYYY-MM-DD").toDate()
                ],
                datasets: [{
                    data: [{
                        x: moment("2018-09-10", "YYYY-MM-DD"),
                        y: 10
                    }, {
                        x: moment("2018-09-15", "YYYY-MM-DD"),
                        y: 18
                    }, {
                        x: moment("2018-09-16", "YYYY-MM-DD"),
                        y: 19
                    }, {
                        x: moment("2018-09-17", "YYYY-MM-DD"),
                        y: 21
                    }],
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
                            tooltipFormat: 'll HH:mm',
                            displayFormats: {
                                quarter: 'll HH:mm',
                            }
                        }
                    }]
                },
            }
        });
    }

    for (let i = 0; i < this.length; i++) {
        demoLinearChart(new $(this[i]));
    }
};

$.prototype.demoRadialChart = function () {
    let demoRadialChart = function ($element) {
        // progressbar.js@1.0.0 version is used
        // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

        var bar = new ProgressBar.Circle($element[0], {
            strokeWidth: 2,
            trailWidth: 2,
            color: '#2cc6ab',
            text: {
                // Initial value for text.
                // Default: null
                value: '27%',
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

        if ($element.attr('size') == 'sm') {
            bar.text.style.fontSize = '12px';
            bar.text.style.fontWeight = '500';
        } else {
            bar.text.style.fontSize = '24px';
            bar.text.style.fontWeight = '500';
        }

        bar.set(.27);
    }

    for (let i = 0; i < this.length; i++) {
        demoRadialChart(new $(this[i]));
    }
};

$.prototype.collapse = function(cfg) {
    if (this.lenth == 0) {
        return;
    }

    let collapse = function($root) {
        $root.find('[collapse-header]').unbind('click').bind('click', function() {
            $(this).closest('[collapse-item]').toggleClass('active');
        });
    };

    for (let i = 0; i < this.length; i++) {
        new collapse($(this[i]));
    }
};

$('[collapse]').collapse();

$(demoLinearChart).demoLinearChart();
$(demoRadialChart).demoRadialChart();