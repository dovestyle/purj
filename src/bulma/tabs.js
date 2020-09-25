(function() {

    this.tabs = function(options) {
        if (this._tabs) { return this._tabs; }

        var tabs = {
            activeContent: this.pluck('.tab-content.is-active'),
            activeTab:     this.pluck('.tabs li.is-active'),
            contents:      this.find('.tab-content'),
            element:       this,
            tabs:          this.find('.tabs li'),
            wrapper:       this,
            _fading:       false,

            options: Object.assign({
                fadeoutClass: false,
                fadeoutTime:  false,
            }, options || {}),

            open: function(tab) {
                if (this.activeTab) {
                    this.activeTab.classList.remove('is-active');
                }

                this.activeTab = tab;
                tab.classList.add('is-active');

                if (this.activeContent) {
                    tabs.fadeContent();
                } else {
                    this.activateContent();
                }
            },

            activateContent: function() {
                var content = this.contents[this.tabs.indexOf(this.activeTab)];

                this.activeContent = content;

                content.classList.add('is-active');
            },

            fadeContent: function() {
                if (this.options.fadeoutClass !== false &&
                    this.options.fadeoutTime !== false &&
                    this._fading === false
                ) {
                    this._fading = true;
                    this.activeContent.classList.add(this.options.fadeoutClass);
                    setTimeout((function() {
                        this.fadeContent();
                    }).bind(this), this.options.fadeoutTime * 1000);
                } else {
                    this.activeContent.classList.remove('is-active', this.options.fadeoutClass);
                    this._fading = false;
                    this.activateContent();
                }
            }
        };

        this.find('.tabs li').on('click', function(e) {
            e.preventDefault();
            tabs.open(this);
        });

        if (tabs.activeTab && !tabs.activeContent) {
            tabs.activeTab.click();
        }

        this._tabs = tabs;
        return tabs;
    };

}).call(Element.prototype);
