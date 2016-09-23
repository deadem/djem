/* global Ext, djem */
Ext.define('djem.view.main.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-grid',

    requires: [
        'djem.store.main.Grid'
    ],

    config: {
        color: null,
        filter: null,
        filterListeners: null,
        filterTimeout: null
    },

    destroyFilterListeners: function() {
        var me = this,
            listeners = me.getFilterListeners();

        clearTimeout(me.getFilterTimeout());
        if (listeners) {
            listeners.destroy();
        }
        me.setFilterListeners(null);
    },

    changeFilter: function() {
        var me = this,
            store = me.getView().getStore(),
            value = me.getFilter().getValue();

        store.getProxy().setExtraParam('filter', value);
        clearTimeout(me.getFilterTimeout());
        me.setFilterTimeout(setTimeout(function() {
            store.getSorters().clear();
            store.loadPage(1);
        }, value ? 300 : 0));
    },

    init: function() {
        var me = this,
            view = me.getView(),
            main = view.up('app-main'),
            toolbar = main.getToolbar();

        me.setFilter(toolbar.lookupReference('search'));

        view.on('load', function(id, color) {
            me.setColor(color);

            var store = view.getStore();
            store.getProxy().setExtraParam('tree', id);
            store.getSorters().clear();

            var filter = me.getFilter();

            filter.setValue('');
            store.getProxy().setExtraParam('filter', null);
            store.loadPage(1);
        });
        view.on('click.toolbar', function(ref, params) {
            params = params || {};
            me.openDocument(view, { data: { _doctype: params._doctype } });
        });
    },

    initViewModel: function() {
        var me = this,
            view = me.getView();

        // новый вид - новый стор
        var store = Ext.create('djem.store.main.Grid');
        view.setStore(store);

        view.addDocked({
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: store,

            items: [
            ],
            displayInfo: true,
            displayMsg: 'Displaying rows {0} - {1} of {2}',
            emptyMsg: 'No rows to display'
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

            var parent = view.lookupReferenceHolder();
            var gridView = parent.lookupReference('grid-view');

            me.destroyFilterListeners();

            if (meta.view) {
                // замена вьювера
                parent.lookupReference('grid').hide();
                gridView.show();
                gridView.add(Ext.create('widget.main-content', {
                    data: meta
                }));
                return;
            }
            gridView.hide();
            parent.lookupReference('grid').show();
            if (gridView.down()) {
                gridView.down().destroy();
            }

            var listeners = me.getFilter().on({
                change: me.changeFilter,
                scope: me,
                destroyable: true
            });

            me.setFilterListeners(listeners);

            view.on({
                destroy: function() {
                    me.destroyFilterListeners();
                },
                options: {
                    single: true
                }
            });

            _store.model.replaceFields(meta.fields, true);
            view.reconfigure(_store, meta.columns);

            view.getView().setScrollY(0);
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
            text: 'Редактировать',
            glyph: 'xE3C9@Icons',
            handler: 'openDocument'
        });
        Ext.each((me.getView().getStore().userOptions || {}).contextMenu || [], function(v) {
            menu.push(Ext.apply({}, v));
        });
        Ext.each(menu, function(v) {
            var command = v.handler;
            if (v['function']) {
                v.handler = command = function() {
                    eval(v['function']);
                };
            }
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
