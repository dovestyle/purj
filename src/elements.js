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

export default (function(self) {
    "use strict";

    return self;
})({});
