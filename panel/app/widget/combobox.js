Ext.define('djem.widget.combobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: [ 'djem.combobox', 'djem.combo', 'djem.select', 'widget.combobox', 'widget.combo', 'widget.select' ],

    pageSize: 100,
    queryParam: 'filter',
    minChars: 1,
    forceSelection: true,
    queryMode: 'remote',
    displayField: 'text',
    valueField: 'value',
    autoSelect: false,
    changingFilters: true,

    setValue: function (value, doSelect) {
        var me = this;
        if (Ext.isObject(value) && !value.isModel && me.queryMode == 'remote') {
            me.store.clearFilter(true);
            if (me.store.find(me.valueField, value[me.valueField]) == -1) {
                me.store.insert(0, value);
            }
            me.callParent([ value[me.valueField], doSelect ]);
        } else {
            me.callParent(arguments);
        }
    },

    listeners: {
        focus: function() {
            var me = this;
            me.getStore().load({
                callback: function(r, options, success) {
                    me.expand();
                }
            });
        },
        added: function() {
            var me = this;
            var store = me.getStore();
            if (store && me.queryMode == 'remote') {
                var view = me.up('main-content');
                store.getProxy().setExtraParams({
                    '_doctype': view.config.data._doctype,
                    'id': view.config.data.id,
                    'field': me.name
                });
            }
        }
    }
});
