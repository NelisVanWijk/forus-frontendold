module.exports = function() {
    return function(_in, size) {
        return parseFloat(_in).toFixed(size);
    }
};