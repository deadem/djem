/* global Ext */
Ext.define('djem.widget.gridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.djem-grid',

    requires: [
            'djem.store.Grid'
    ],

    init: function() {
        var me = this,
            view = me.getView();

        me.initStore();
        view.getStore().load();
    },

    initStore: function() {
        var me = this,
            view = me.getView();

        view.setStore(Ext.create('djem.store.Grid'));
        var store = view.getStore();

        store.on('metachange', function(store, meta) {
            store.model.replaceFields(meta.fields, true);
            view.reconfigure(store, meta.columns);
        });

        var content = view.up('main-content') || view.up('crosslink-editor');
        store.getProxy().setExtraParams({
            _doctype: content.config.data._doctype,
            id: content.config.data.id,
            field: view.name
        });
    }
});
