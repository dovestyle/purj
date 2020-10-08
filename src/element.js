(function() {

    this.find  = this.querySelectorAll;
    this.on    = this.addEventListener;
    this.pluck = function(selector) {
        if (selector instanceof Element) { return selector; }
        return this.querySelector(selector);
    };

    this.findParent = function(selector) {
        var parent = this.parentElement;

        while (parent !== null) {
            if ('matches' in parent && parent.matches(selector)) {
                return parent;
            }

            parent = parent.parentElement;
        }

        return false;
    };

    this.getData = function(name) {
        if (this.dataset) {
            if (name) {
                return this.dataset[name];
            }

            return this.dataset;
        }

        var i, attr, data = {};

        for (i = 0; i < this.attributes.length; i++) {
            attr = this.attributes[i].name.toLowerCase();
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

    this.setData = function(data, val, prefix) {
        if (prefix && prefix != '') {
            prefix = prefix + '-';
        } else {
            prefix = '';
        }

        if (typeof data == 'object') {
            for (var key in data) {
                if (typeof data[key] != 'function') {
                    this.setData(key, data[key]);
                }
            }
        } else if (typeof val == 'object') {
            for (var key in val) {
                if (typeof val[key] != 'function') {
                    this.setData(key, val[key], prefix + data);
                }
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

}).call(Element.prototype);
