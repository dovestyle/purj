(function() {

    this.modal = function(options) {
        if (this._modal) { return this._modal; }

        var modal = {
            element: this,

            options: Object.assign({
                closeOnClick: false,
                closeOnEsc:   true,
                fadeoutClass: false,
                fadeoutTime:  false,
                noscroll:     true,
            }, options || {}),

            _fading:   false,
            _noscroll: false,

            open: function() {
                if (this.options.noscroll) {
                    var html = document.pluck('html').classList;
                    if (html.contains('is-clipped')) {
                        this._noscroll = true;
                    } else {
                        html.add('is-clipped');
                    }
                }

                this.element.classList.add('is-active');

                if (this.options.closeOnEsc) {
                    var modal = this;
                    document.on('keyup', 'body', function(e) {
                        if (e.key == 'Escape') {
                            e.stopPropagation();
                            modal.close();
                        }
                    }, {
                        once: true,
                    });
                }
            },

            close: function() {
                if (this.options.fadeoutClass !== false &&
                    this.options.fadeoutTime !== false &&
                    this._fading === false
                ) {
                    this._fading = true;
                    this.element.classList.add(this.options.fadeoutClass);
                    setTimeout((function() {
                        this.close();
                    }).bind(this), this.options.fadeoutTime * 1000);
                } else {
                    if (this.options.noscroll && !this._noscroll) {
                        document.pluck('html').classList.remove('is-clipped');
                    }

                    this.element.classList.remove('is-active', this.options.fadeoutClass);
                    this._fading = false;
                }
            },
        };

        this.find('.modal-close').on('click', function(e) {
            e.preventDefault();
            modal.close();
        });

        if (modal.options.closeOnClick) {
            this.pluck('.modal-background').on('click', function() {
                modal.close();
            });
        }

        this._modal = modal;
        return modal;
    };

}).call(Element.prototype);
