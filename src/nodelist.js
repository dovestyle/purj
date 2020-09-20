var nlp = NodeList.prototype;

nlp.apply = function(callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback.call(this[i], i) === false) {
            break;
        }
    }
};

nlp.setData = function(name, value) {
    for (var i = 0; i < this.length; i++) {
        this.setData(name, value);
    }
};

nlp.on = function(event, callback, options) {
    for (var i = 0; i < this.length; i++) {
        this[i].on(event, callback, options);
    }
};

nlp.first = function() { return this[0]; };
nlp.last  = function() { return this[this.length-1]; }
