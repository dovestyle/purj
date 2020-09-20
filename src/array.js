var ap  = Array.prototype;

ap.apply = function(callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback.call(this[i], i) === false) {
            break;
        };
    }
};

ap.first = function() { return this[0]; };
ap.last  = function() { return this[this.length-1]; }
