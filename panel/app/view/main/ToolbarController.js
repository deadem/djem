Ext.define('djem.view.main.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-toolbar',

    getButtons: function() {
        var buttons = [];
        var refs = this.getReferences();
        for (var ref in refs) {
            obj = refs[ref];
            if (obj instanceof Ext.button.Button) {
                buttons.push({ ref: ref, obj: obj });
            }
        }
        return buttons;
    },

    init: function(_this) {
        var me = this;
        me.getView().on('change.toolbar', function(_this, name) {
            var toolbars = {
                'main': [ 'add' ],
                'content': [ 'save', 'close' ]
            };
            Ext.each(me.getButtons(), function(data) {
                data.obj[toolbars[name].indexOf(data.ref) < 0 ? 'hide' : 'show']();
            });
        }).on('update.toolbar', function(ref, data) {
            var button = me.getReferences()[ref];
            if (button) {
                var actions = {
                    'enable': function() { button.enable(); },
                    'disable': function() { button.disable(); },
                    'hide': function() { button.hide(); },
                    'show': function() { button.show(); },
                    'replace': function(data) {
                        button.setGlyph(data.glyph);
                        button.setText(data.text || '?');
                        button.setParams(data);
                        if (data.menu !== undefined) { button.setMenu(data.menu); }
                    }
                };
                (actions[data.action] || function(){})(data);
            }
        });

        Ext.each(me.getButtons(), function(data) {
            data.obj.on('click', function(_this) {
                djem.app.fireEvent('click.toolbar', data.ref, data.obj.params);
            });
        })
    }
});
