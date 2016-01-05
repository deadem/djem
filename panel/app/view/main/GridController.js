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
            store.getSorters().clear();

            var filter = me.lookupReference('filter');
            if (filter.getValue()  != '') {
                filter.setValue('');
            } else {
                store.getProxy().setExtraParam('filter', null);
                store.loadPage(1);
            }
        });
        me.getView().up('panel').on('click.toolbar', function(ref, params) {
            params = params || {};
            me.openDocument(me.getView(), { data: { _doctype: params._doctype } });
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

            items: [
                '-',
                { xtype: 'label', text: 'Filter:' },
                { xtype: 'textfield', reference: 'filter' }
            ],
            displayInfo: true,
            displayMsg: 'Displaying rows {0} - {1} of {2}',
            emptyMsg: "No rows to display"
        });

        var filterTimeout;
        me.lookupReference('filter').on('change', function() {
            var store = me.getView().getStore();
            store.getProxy().setExtraParam('filter', this.getValue());
            clearTimeout(filterTimeout);
            Ext.defer(function() {
                store.getSorters().clear();
                store.loadPage(1);
            }, this.getValue() ? 300 : 0);
        });

        store.on("metachange", function(_store, meta, eOpts) {
            me.titleField = (meta.options || {})['title'];
            var doctype = (meta.options || {})['_doctype'];
            var subtypes = (meta.options || {})['subtypes'];
            if (!subtypes || subtypes.length == 0) {
                djem.app.fireEvent('update.toolbar', 'add', { 'action': 'replace' });
                djem.app.fireEvent('update.toolbar', 'add', { 'action': 'disable' });
            } else {
                var menu = { };
                if (subtypes.length == 1) {
                    menu = subtypes[0];
                    menu.text = menu.name;
                    menu.menu = false;
                }
                menu.action = 'replace';
                djem.app.fireEvent('update.toolbar', 'add', menu);
                djem.app.fireEvent('update.toolbar', 'add', { 'action': 'enable' });
            }

            var parent = me.getView().lookupReferenceHolder();
            if (meta.view) {
                // замена вьювера
                parent.lookupReference('grid').hide();
                parent.lookupReference('grid-view').show();
                return;
            }
            parent.lookupReference('grid-view').hide();
            parent.lookupReference('grid').show();

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
            _doctype: data._doctype
        });
    }
});
