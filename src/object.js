(function() {

    this.apply = function(callback) {
        for (var key in this) {
            if (callback.call(this[key], this) === false) {
                break;
            }
        }
    };

}).call(Object.prototype);
