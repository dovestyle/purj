const ap  = Array.prototype;
const nlp = NodeList.prototype;

ap.apply = function(callback) {
    var i, output = [];

    for (var i in this) {
        callback.call(this[i], i);
        output.push(this[i]);
    }

    return output;
};

nlp.apply = function(callback) {
    var i, output = [];

    for (i in this) {
        if (this[i] instanceof Element) {
            callback.call(this[i], i);
            output.push(this[i]);
        }
    }

    return output;
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

ap.first = nlp.first = function() { return this[0]; };
ap.last  = nlp.last  = function() { return this[this.length-1]; }

export default (function(self) {
    "use strict";

    return self;
})({});
