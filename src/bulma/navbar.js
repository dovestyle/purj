import purj from '../../index';

(function() {

    this.navbar = function() {
        if (this._navbar) { return this._navbar; }

        this.on('click', function(e) {
            e.preventDefault();

            var target = document.getElementById(this.getData('target'));

            this.classList.toggle('is-active');
            target.classList.toggle('is-active');
        });

        this._navbar = {};
        return this._navbar;
    };

}).call(Element.prototype);

export default purj;
