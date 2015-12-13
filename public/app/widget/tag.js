Ext.define('djem.widget.tag', {
    extend: 'Ext.form.field.Tag',
    alias: [ 'djem.tag', 'widget.tag' ],

    pageSize: 100,
    minChars: 1,
    filterPickList: true,
    displayField: 'text',
    valueField: 'value',
    queryMode: 'remote',
    queryParam: 'filter',

    setValue: function (value, doSelect) {
        var me = this;
        if (Ext.isArray(value) && value.length && Ext.isObject(value[0]) && !value.isModel && !me.store.isLoaded() && me.queryMode == 'remote') {
            var values = [];
            var store = me.store;
            for (var i = 0, len = value.length; i < len; i++) {
                values.push(value[i][me.valueField]);
                store.insert(i, value[i]);
            }
            me.callParent([ values, doSelect ]);
        } else {
            me.callParent(arguments);
        }
    },

    listeners: {
        'change': function() {
            this.completeEdit();
        },
        added: function() {
            var me = this;
            var store = me.getStore();
            if (store) {
                var view = me.up('main-content');
                store.getProxy().setExtraParams({
                    '_doctype': view.config.data._doctype,
                    '_model': view.config.data._model,
                    'id': view.config.data.id,
                    'field': me.name
                });
            }
        }
    }
});
