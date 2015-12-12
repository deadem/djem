Ext.define('djem.widget.combobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: [ 'djem.combobox', 'djem.combo', 'djem.select', 'widget.combobox', 'widget.combo', 'widget.select' ],

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
