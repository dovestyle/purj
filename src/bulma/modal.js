import purj from '../../index';

(function() {

    this.modal = function(options) {
        if (this._modal) { return this._modal; }

        var modal = {
            element: this,

            options: Object.assign({
                noscroll: true,
                open:    false,
            }, options || {}),

            open: function() {
                if (this.options.noscroll) {
                    document.pluck('html').classList.add('is-clipped');
                }

                this.element.classList.add('is-active');
            },

            close: function() {
                if (this.options.noscroll) {
                    document.pluck('html').classList.remove('is-clipped');
                }

                this.element.classList.remove('is-active');
            },
        };

        this.find('.modal-close').on('click', function(e) {
            e.preventDefault();
            modal.close();
        });

        if (modal.options.open) {
            modal.open();
        }

        this._modal = modal;
        return modal;
    };

}).call(Element.prototype);

export default purj;
