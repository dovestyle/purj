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

Element.prototype.getData = function(name) {
    var i, attr, data = {};

    for (i = 0; i < this.attributes.length; i++) {
        attr = this.attributes[i].name;
        if (attr.startsWith('data-')) {
            var key = attr.split('-', 2)[1];
            if (name) {
                if (name == key) { return this.attributes[i].value; }
            } else {
                data[key] = this.attributes[i].value;
            }
        }
    }

    if (!name) {
        return data;
    }
};

Element.prototype.setData = function(data, val) {
    if (typeof data == 'object') {
        for (var key in data) {
            this.setData(key, data[key]);
        }
    } else {
        this.setAttribute('data-' + data, val);
    }
};

export default (function(self) {
    "use strict";

    return self;
})({});
