Ext.define('djem.widget.combobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: [ 'djem.combobox', 'djem.combo', 'djem.select', 'widget.combobox', 'widget.combo', 'widget.select' ],

    pageSize: 100,
    queryParam: 'filter',
    autoLoadOnValue: true,
    minChars: 1,
    forceSelection: true,
    queryMode: 'remote',
    displayField: 'text',
    valueField: 'id',
    autoSelect: false,
    changingFilters: true,

    setValue: function (value, doSelect) {
        if (Ext.isObject(value) && !value.isModel && !this.store.isLoaded() && this.queryMode == 'remote') {
            this.setHiddenValue(value[this.valueField]);
            this.value = value[this.valueField];
            this.setRawValue(value[this.displayField]);
        } else {
            this.callParent(arguments);
        }
    },

    listeners: {
        added: function() {
            var me = this;
            var view = me.up('main-content');
            var store = me.getStore();

            store.getProxy().setExtraParams({
                '_doctype': view.config.data._doctype,
                '_model': view.config.data._model,
                'id': view.config.data.id,
                'field': me.name
            });
        }
    }
});
