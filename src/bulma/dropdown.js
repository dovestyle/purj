(function() {

    this._dropdownEvent = false;

    this.dropdown = function(options) {
        if (this._dropdown) { return this._dropdown; }

        var dd = {
            element: this,

            options: Object.assign({

            }, options || {}),

            open: function() {
                this.element.classList.add('is-active');
            }
        };

        this.find('.dropdown-trigger').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dd.open();
        });

        if (this._dropdownEvent === false) {
            this._dropdownEvent = true;
            document.addEventListener('click', function() {
                document.find('.dropdown:not(.is-hoverable)').apply(function() {
                    this.classList.remove('is-active');
                });
            });
        }

        this._dropdown = dd;
        return dd;
    };

}).call(Element.prototype);
