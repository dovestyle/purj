(function() {

    this.message = function(options) {
        if (this._message) { return this._message; }

        var message = {
            element: this,

            options: Object.assign({
                fadeoutClass: false,
                fadeoutTime:  false,
                remove:       false,
            }, options || {}),

            _fading: false,

            close: function() {
                if (this.options.fadeoutClass !== false &&
                    this.options.fadeoutTime !== false &&
                    !this._fading
                ) {
                    this._fading = true;
                    this.element.classList.add(this.options.fadeoutClass);
                    setTimeout((function() {
                        this.close();
                    }).bind(this), this.options.fadeoutTime * 1000);
                } else {
                    this.element.style.display = 'none';
                    this.element.classList.remove(this.options.fadeoutClass);
                    if (this.options.remove) {
                        this.element.remove();
                    }
                    this._fading = false;
                }
            }
        };

        this.find('.delete').on('click', function(e) {
            e.preventDefault();
            message.close();
        });
    };

}).call(Element.prototype);
