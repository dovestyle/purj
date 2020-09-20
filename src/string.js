var sp = String.prototype;

sp.camelize = function() {
    return this.replace(/-([a-z])/g, function(m) {
        return m[1].toUpperCase();
    });
};
