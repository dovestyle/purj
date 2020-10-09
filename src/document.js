(function() {

    this.purj = {
        events:    {},
        listeners: {},

        handler: function(event, event_obj) {
            var event_path = event_obj.composedPath();
            for (var i = 0; i < event_path.length; i++) {
                if (typeof event_path[i].matches != 'undefined') {
                    this.listeners[event].apply(function(n) {
                        if (this.callback && event_path[i].matches(this.selector)) {
                            this.callback.call(event_path[i], event_obj);
                            if (this.options.once) {
                                this.listeners[event] = this.listeners[event].splice(n, 1);
                            }
                            return false;
                        }
                    });
                }

                if (event_obj.cancelBubble) {
                    break;
                }
            }
        },
    };

    this.find  = this.querySelectorAll;
    this.pluck = function(selector) {
        if (selector instanceof Element) { return selector; }
        return this.querySelector(selector);
    };

    this.ready = function(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback.call(document);
        } else {
            document.addEventListener('DOMContentLoaded', callback, {
                once: true,
            });
        }
    };

    this.on = function(event, selector, callback, options) {
        if (typeof selector == 'function') {
            document.addEventListener(event, selector, callback);

        } else if (selector instanceof Element || selector instanceof NodeList) {
            selector.on(event, callback, options);

        } else if (selector instanceof Array) {
            selector.apply(function() {
                document.on(event, this, callback, options);
            });

        } else {
            if (!(event in this.purj.events)) {
                document.addEventListener(event, function(ev) {
                    this.purj.handler(event, ev);
                }, options || {});

                this.purj.events[event] = true;
            }

            if (!(event in this.purj.listeners)) {
                this.purj.listeners[event] = [];
            }

            this.purj.listeners[event].unshift({
                callback: callback,
                options:  options || {},
                selector: selector,
            });
        }
    };

}).call(Document.prototype);
