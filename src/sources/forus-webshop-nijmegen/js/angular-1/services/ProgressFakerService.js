let ProgressFakerService = function(
    $timeout
) {
    return {
        make: function(time) {
            return new (function(time) {
                var timeout = false;
                var self = this;
                var cur_time = time;

                self.end = function() {
                    return this;
                };

                self.progress = function(cur_time) {

                };

                self.on = function(event, callback) {
                    self[event] = callback;
                    return this;
                };

                var runTimeout = function() {
                    $timeout(function() {
                        self.progress(100 - (time / 100) * (cur_time / 100));
                        cur_time -= 100;

                        if (cur_time <= 0) {
                            self.end();
                        } else {
                            runTimeout();
                        }
                    }, 100);
                };

                runTimeout();
            })(time);
        }
    };
};

module.exports = [
    '$timeout',
    ProgressFakerService
];