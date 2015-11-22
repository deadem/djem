Ext.define('djem.view.crosslink.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crosslink-grid',

    initViewModel: function() {
        var me = this;
        me.getView().setStore(Ext.create('djem.store.CrossLink', { model: 'djem.model.Grid' }));
    }
});
