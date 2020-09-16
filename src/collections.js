Array.prototype.apply = function(callback) {
    var i, output = [];

    for (var i in this) {
        callback.call(this[i], i);
        output.push(this[i]);
    }

    return output;
};

NodeList.prototype.apply = function(callback) {
    var i, output = [];

    for (i in this) {
        if (this[i] instanceof Element) {
            callback.call(this[i], i);
            output.push(this[i]);
        }
    }

    return output;
};

export default (function(self) {
    "use strict";

    return self;
})({});
