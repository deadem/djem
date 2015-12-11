Ext.define('djem.view.main.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-grid',

    requires: [
        'djem.store.main.Grid'
    ],

    init: function() {
        var me = this;
        me.getView().on('load', function(id) {
            var store = me.getView().getStore();
            store.getProxy().setExtraParam('tree', id);
            store.load();
        });
        me.getView().up('panel').on('click.toolbar', function(ref, params) {
            params = params || {};
            me.openDocument(me.getView(), { data: { _model: params._model, _doctype: params._doctype } });
        });
    },

    initViewModel: function(_this) {
        var me = this;
        // новый вид - новый стор
        var store = Ext.create('djem.store.main.Grid');
        me.getView().setStore(store);

        me.getView().addDocked({
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: store,

            displayInfo: true,
            displayMsg: 'Displaying rows {0} - {1} of {2}',
            emptyMsg: "No rows to display",
        });

        store.on("metachange", function(_store, meta, eOpts) {
            me.titleField = (meta.options || {})['title'];
            var doctype = (meta.options || {})['_doctype'];
            var models = (meta.options || {})['models'];
            if (!models || models.length == 0) {
                djem.app.fireEvent('update.toolbar', 'add', { 'action': 'replace' });
                djem.app.fireEvent('update.toolbar', 'add', { 'action': 'disable' });
            } else {
                var menu = { };
                if (models.length == 1) {
                    menu = models[0];
                    menu.text = menu.name;
                    menu._doctype = doctype;
                    menu.menu = false;
                }
                menu.action = 'replace';
                djem.app.fireEvent('update.toolbar', 'add', menu);
                djem.app.fireEvent('update.toolbar', 'add', { 'action': 'enable' });
            }

            _store.model.replaceFields(meta.fields, true);
            me.getView().reconfigure(_store, meta.columns);
        });
    },

    rowdblclick: function(_this, record, tr, rowIndex, e, eOpts) {
        this.openDocument(_this, record);
    },

    itemkeydown: function(_this, record, item, index, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            this.openDocument(_this, record);
        }
    },

    openDocument: function(_this, record) {
        var me = this;
        var tree = (me.getView().getStore().lastOptions.params || {})['tree'];
        var data = record.data || {};
        me.getView().fireEvent('openDocument', _this, {
            id: record.id,
            title: data[me.titleField],
            _model: data._model,
            _doctype: data._doctype
        });
    }
});
