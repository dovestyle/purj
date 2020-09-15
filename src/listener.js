module.exports.listener = (function(self) {
    "use strict";

    self.events    = {};
    self.listeners = {};

    self.ready = function(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback.call(document);
        } else {
            document.addEventListener('DOMContentLoaded', callback, {
                once: true,
            });
        }
    };

    self.handle = function(event, event_obj) {
        var i, n, listener;
        for (i in self.listeners[event]) {
            listener = self.listeners[event][i];

            for (n in event_obj.path) {
                if ('matches' in event_obj.path[n] && event_obj.path[n].matches(listener.selector)) {
                    listener.callback.call(event_obj.path[n], event_obj);
                    break;
                }
            }

            if (event_obj.cancelBubble) {
                break;
            }
        }
    };

    self.add = function(event, selector, callback) {
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
    };

    if (typeof Proxy !== 'undefined') {
        return new Proxy(self, {
            get(target, p) {
                if (p in target) {
                    return target[p];
                }

                return function(...args) {
                    if (args.length > 1) {
                        self.add(p, args[0], args[1]);
                    }
                }
            }
        });
    } else {
        return self;
    }
})({});
