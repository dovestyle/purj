String.prototype.camelize = function() {
    return this.replace(/-([a-z])/g, function(m) {
        return m[1].toUpperCase();
    });
};

export default (function(self) {
    "use strict";

    return self;
})({});
