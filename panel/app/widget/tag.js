/* global Ext */
Ext.define('djem.widget.tag', {
    extend: 'Ext.form.field.Tag',
    alias: [ 'widget.djem.tag', 'widget.tag' ],

    pageSize: 100,
    minChars: 1,
    filterPickList: true,
    displayField: 'text',
    valueField: 'value',
    queryMode: 'remote',
    queryParam: 'filter',

    requires: [
        'djem.store.Tag'
    ],

    listeners: {
        change: function() {
            this.completeEdit();
        },
        added: function() {
            var me = this;
            me.setStore(Ext.create('djem.store.Tag'));

            var store = me.getStore();
            if (store && me.queryMode == 'remote') {
                var view = me.up('main-content') || me.up('crosslink-editor');
                store.getProxy().setExtraParams({
                    _doctype: view.config.data._doctype,
                    id: view.config.data.id,
                    field: me.name
                });
            }
        }
    }
});
