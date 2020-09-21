(function() {

    this.apply = function(callback) {
        for (var i = 0; i < this.length; i++) {
            if (callback.call(this[i], i) === false) {
                break;
            }
        }
    };

    this.first = function() { return this[0]; };
    this.last  = function() { return this[this.length-1]; }

}).call(Array.prototype);
