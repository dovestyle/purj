import purj from '../../index';

(function() {

    this.tabs = function() {
        if (this._tabs) { return this._tabs; }

        var tabs = {
            activeContent: this.pluck('.tab-content.is-active'),
            activeTab:     this.pluck('.tabs li.is-active'),
            contents:      this.find('.tab-content'),
            tabs:          this.find('.tabs li'),
            wrapper:       this,
        };

        this.find('.tabs li').on('click', function(e) {
            e.preventDefault();

            if (tabs.activeTab) {
                tabs.activeTab.classList.remove('is-active');
            }

            if (tabs.activeContent) {
                tabs.activeContent.classList.remove('is-active');
            }

            var content = tabs.contents[tabs.tabs.indexOf(this)];

            this.classList.add('is-active');
            content.classList.add('is-active');

            tabs.activeTab     = this;
            tabs.activeContent = content;
        });

        if (tabs.activeTab && !tabs.activeContent) {
            tabs.activeTab.click();
        }

        this._tabs = tabs;
        return tabs;
    }

}).call(Element.prototype);

export default purj;
