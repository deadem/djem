/* global Ext, djem */
Ext.define('djem.view.main.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-grid',

    requires: [
        'djem.store.main.Grid'
    ],

    config: {
        color: null
    },

    init: function() {
        var me = this, view = me.getView();

        view.on('load', function(id, color) {
            me.setColor(color);
            var store = view.getStore();
            store.getProxy().setExtraParam('tree', id);
            store.getSorters().clear();

            var filter = me.lookupReference('filter');
            if (filter.getValue() === '') {
                store.getProxy().setExtraParam('filter', null);
                store.loadPage(1);
            } else {
                filter.setValue('');
            }
        });
        view.on('click.toolbar', function(ref, params) {
            params = params || {};
            me.openDocument(view, { data: { _doctype: params._doctype } });
        });
    },

    initViewModel: function() {
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
            emptyMsg: 'No rows to display'
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

        store.on('metachange', function(_store, meta) {
            _store.userOptions = meta.options || {};
            me.titleField = _store.userOptions.title;
            var subtypes = _store.userOptions.subtypes;
            if (!subtypes || subtypes.length === 0) {
                djem.app.fireEvent('update.toolbar', 'add', { action: 'replace' });
                djem.app.fireEvent('update.toolbar', 'add', { action: 'disable' });
            } else {
                var menu = { };
                if (subtypes.length == 1) {
                    menu = subtypes[0];
                    menu.text = menu.name;
                    menu.menu = false;
                }
                menu.action = 'replace';
                djem.app.fireEvent('update.toolbar', 'add', menu);
                djem.app.fireEvent('update.toolbar', 'add', { action: 'enable' });
            }

            var parent = me.getView().lookupReferenceHolder();
            var view = parent.lookupReference('grid-view');

            if (meta.view) {
                // замена вьювера
                parent.lookupReference('grid').hide();
                view.show();
                view.add(Ext.create('widget.main-content', {
                    data: meta
                }));
                return;
            }
            view.hide();
            parent.lookupReference('grid').show();
            if (view.down()) {
                view.down().destroy();
            }

            _store.model.replaceFields(meta.fields, true);
            me.getView().reconfigure(_store, meta.columns);
        });
    },

    cellcontextmenu: function(_this, td, cellIndex, record, tr, rowIndex, e) {
        var me = this;
        var menu = [];
        function handler(code) {
            return function() {
                if (me[code]) {
                    me[code](_this, record);
                } else {
                    Ext.MessageBox.show({ title: 'Invalid command', msg: code });
                }
            };
        }
        menu.push({
            text: 'Edit',
            handler: 'openDocument'
        });
        Ext.each((me.getView().getStore().userOptions || {}).contextMenu || [], function(v) {
            menu.push(Ext.apply({}, v));
        });
        Ext.each(menu, function(v) {
            var command = v.handler;
            if (command && typeof command != 'function') {
                v.handler = handler(command);
            }
        });
        var contextMenu = new Ext.menu.Menu({
            listeners: {
                hide: function(_this) {
                    // хак для того, чтобы вызвались штатные хендлеры
                    Ext.defer(function() {
                        _this.destroy();
                    }, 1);
                }
            },
            items: menu
        });
        contextMenu.showAt(e.getXY());
        e.stopEvent();
    },

    rowdblclick: function(_this, record) {
        this.openDocument(_this, record);
    },

    itemkeydown: function(_this, record, item, index, e) {
        if (e.getKey() == e.ENTER) {
            this.openDocument(_this, record);
        }
    },

    cloneDocument: function(_this, record) {
        var me = this;
        me.openDocument(_this, record, { clone: true });
    },

    openDocument: function(_this, record, options) {
        var me = this;
        var data = record.data || {};
        options = options || {};
        me.getView().fireEvent('openDocument', _this, {
            id: options.clone ? undefined : record.id,
            title: data[me.titleField],
            _doctype: data._doctype,
            clone: options.clone ? record.id : undefined,
            color: me.getColor()
        });
    },

    deleteDocument: function(_this, record) {
        var me = this;
        var data = record.data || {};
        djem.app.fireEvent('deleteDocument', _this, {
            id: record.id,
            title: data[me.titleField],
            _doctype: data._doctype
        });
    }
});
