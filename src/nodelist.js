(function() {

    this.apply = function(callback) {
        for (var i = 0; i < this.length; i++) {
            if (callback.call(this[i], i) === false) {
                break;
            }
        }
    };

    this.indexOf = function(element) {
        for (var i = 0; i < this.length; i++) {
            if (element == this[i]) { return i; }
        }

        return -1;
    };

    this.setData = function(name, value) {
        for (var i = 0; i < this.length; i++) {
            this.setData(name, value);
        }
    };

    this.on = function(event, callback, options) {
        for (var i = 0; i < this.length; i++) {
            this[i].on(event, callback, options);
        }
    };

    this.first = function() { return this[0]; };
    this.last  = function() { return this[this.length-1]; }

}).call(NodeList.prototype);
