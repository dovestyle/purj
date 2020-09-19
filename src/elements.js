var dp = Document.prototype;
var ep = Element.prototype;

dp.find  = dp.querySelectorAll;
dp.pluck = dp.querySelector;
ep.find  = ep.querySelectorAll;
ep.pluck = dp.querySelector;

ep.on = function(event, callback, options) {
    this.addEventListener(event, callback, options);
};

ep.findParent = function(selector) {
    var parent = this.parentElement;

    while (parent !== null) {
        if ('matches' in parent && parent.matches(selector)) {
            return parent;
        }

        parent = parent.parentElement;
    }

    return false;
};

ep.getData = function(name) {
    if (this.dataset) {
        if (name) {
            return this.dataset[name];
        }
        return this.dataset;
    }

    var i, attr, data = {};

    for (i = 0; i < this.attributes.length; i++) {
        attr = this.attributes[i].name;
        if (attr.startsWith('data-')) {
            var key  = attr.replace(/^data-/, '');
            var key2 = attr.camelize();

            if (name && (name == key || name == key2)) {
                return this.attributes[i].value;
            } else if (!name) {
                data[key2] = this.attributes[i].value;
            }
        }
    }

    if (!name) {
        return data;
    }
};

ep.setData = function(data, val, prefix) {
    if (prefix && prefix != '') {
        prefix = prefix + '-';
    } else {
        prefix = '';
    }

    if (typeof data == 'object') {
        for (var key in data) {
            this.setData(key, data[key]);
        }
    } else if (typeof val == 'object') {
        for (var key in val) {
            this.setData(key, val[key], prefix + data);
        }
    } else {
        if (this.dataset) {
            var name = (prefix + data).camelize();
            this.dataset[name] = val;
        } else {
            this.setAttribute('data-' + prefix + data, val);
        }
    }
};

export default (function(self) {
    "use strict";

    return self;
})({});
