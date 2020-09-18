export default (function(self) {
    "use strict";

    self.events    = {};
    self.listeners = {};

    self.ready = function(callback, options) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback.call(document);
        } else {
            document.addEventListener('DOMContentLoaded', callback, {
                once: true,
            });
        }
    };

    self.on = function(event, selector, callback) {
        if (selector instanceof Element || selector instanceof NodeList) {
            selector.on(event, callback);

        } else if (selector instanceof Array) {
            for (var i = 0; i < selector.length; i++) {
                self.on(event, selector[i], callback);
            }

        } else {
            if (!(event in self.events)) {
                document.addEventListener(event, function(ev) {
                    self.handle(event, ev);
                });

                self.events[event] = true;
            }

            if (!(event in self.listeners)) {
                self.listeners[event] = [];
            }

            self.listeners[event].push({
                callback: callback,
                selector: selector,
            });
        }
    };

    self.handle = function(event, event_obj) {
        var i, n, listener;
        for (i in self.listeners[event]) {
            listener = self.listeners[event][i];

            for (n in event_obj.path) {
                if (
                    listener.callback &&
                    'matches' in event_obj.path[n] &&
                    event_obj.path[n].matches(listener.selector)
                ) {
                    listener.callback.call(event_obj.path[n], event_obj);
                    break;
                }
            }

            if (event_obj.cancelBubble) {
                break;
            }
        }
    };

    if (typeof Proxy !== 'undefined') {
        return new Proxy(self, {
            get: function(target, p) {
                if (p in target) {
                    return target[p];
                }

                return function(selector, callback) {
                    self.on(p, selector, callback);
                }
            }
        });
    }

    return self;
})({});
