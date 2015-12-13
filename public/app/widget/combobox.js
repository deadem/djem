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
        if (Ext.isObject(value) && !value.isModel && !me.store.isLoaded() && me.queryMode == 'remote') {
            me.store.insert(0, value);
            me.callParent([ value[me.valueField], doSelect ]);
        } else {
            me.callParent(arguments);
        }
    },

    listeners: {
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
