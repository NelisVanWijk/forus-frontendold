module.exports = [function() {
    return new(function() {
        this.build = function(values, submit) {
            return {
                values: values || {},
                errors: {},
                locked: false,
                lock: function() {
                    this.locked = true;
                },
                unlock: function() {
                    this.locked = false;
                },
                submit: function() {
                    if (!this.locked) {
                        return submit(this);
                    }
                },
                resetValues: function() {
                    return this.values = {};
                },
                resetErrors: function() {
                    return this.errors = {};
                },
                reset: function() {
                    return this.resetValues() & this.resetErrors();
                }
            };
        };
    });
}];