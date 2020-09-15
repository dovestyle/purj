Element.prototype.findParent = function(selector) {
    var parent = this.parentElement;

    while (parent !== null) {
        if (parent.matches(selector)) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return false;
};

exports.elements = (function(self) {
    "use strict";

    return self;
})({});
