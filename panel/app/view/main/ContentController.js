/* global Ext, djem, JSON */
Ext.define('djem.view.main.ContentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-content',

    loadingText: false,

    updateButtons: function() {
        var me = this;
        djem.app.fireEvent('update.toolbar', 'save', { action: me.getView().isDirty() ? 'enable' : 'disable' });
    },

    onDirtyChange: function() {
        var me = this;
        me.updateButtons();
    },

    onSyncData: function() {
        var me = this;
        if (me.getView().getForm().isValid()) {
            me.onSave();
        }
    },

    validate: function() {
        var me = this;
        if (me.getView().getForm().isValid()) {
            me.onSave();
        } else {
            me.getView().getForm().fireEvent('syncFields');
        }
    },

    onSave: function() {
        var me = this;
        var values = { };
        var fields = [];
        Ext.each(me.getView().getForm().getFields().items, function(obj) {
            values = Ext.Object.merge(values, obj.getSubmitData());
            fields.push({ name: obj.name, type: 'string' });
        });

        if (me.loadingMask) {
            me.loadingMask.show();
        }

        var params = me.getStoreOptions();
        me.store.loadData([], false); // drop data
        me.store.setModel(Ext.create('djem.model.Content', { fields: fields }));
        me.store.add([ values ]);
        me.store.sync({
            params: params,
            callback: function() {
                if (me.loadingMask) {
                    me.loadingMask.hide();
                }
                djem.app.fireEvent('update.grid');
            },
            failure: function(response) {
                Ext.each(response.exceptions, function(exception) {
                    var messages = {};
                    try {
                        messages = JSON.parse(exception.error.response.responseText);
                        Ext.each(me.getView().getForm().getFields().items, function(item) {
                            if (messages[item.name]) {
                                item.markInvalid(messages[item.name].join(' '));
                            }
                        });
                    } catch (ex) {
                    }
                });
            }
        });
    },

    onClose: function() {
        this.getView().destroy();
    },

    getStoreOptions: function() {
        var me = this;
        var params = {};
        Ext.Object.each(me.store.lastOptions.params, function(key, value) {
            switch (key) {
                case '_doctype':
                case 'id':
                case 'clone':
                    params[key] = Ext.clone(value);
                    break;
                default:
                    break;
            }
        });
        return params;
    },

    init: function() {
        var me = this;
        var view = me.getView();
        view.on('click.toolbar', function(ref) {
            var actions = {
                'save': function() { view.fireEvent('validate'); },
                'close': function() { me.onClose(); }
            };
            (actions[ref] || function() {})();
        }).on('show.toolbar', function(result) {
            result.value = me.store.toolbar || [];
        }).on('update.title', function(data) {
            var _this = this;
            data = data || {};
            if (typeof data != 'object') {
                data = {};
            }
            data.id = _this.id;
            djem.app.fireEvent('update.tab', _this, data);
        });
        view.getForm().on('dataReady', function() { me.onSyncData(); });

        view.on('reload', function(params) {
            me.reload(params);
        });
    },

    initValues: function() {
        var me = this;
        Ext.each(me.getView().getForm().getFields().items, function(obj) {
            obj.resetOriginalValue();
        });
        me.getView().getForm().checkDirty();
        me.updateButtons();
    },

    initViewModel: function() {
        var me = this;

        me.store = Ext.create('djem.store.main.Content')
            .on('load', function() { me.onLoadContent.apply(me, arguments); })
            .on('write', function() { me.onWriteContent.apply(me, arguments); })
            .on('metachange', function() { me.onViewChange.apply(me, arguments); }, me, { single: true })
            .on('metachange', function() { me.onCodeChange.apply(me, arguments); }, me, { single: true })
            .on('metachange', function() { me.onDataChange.apply(me, arguments); }, me);

        me.loadingMask = new Ext.LoadMask({
            target: me.getView().up(),
            store: me.store
        });

        me.reload();
    },

    reload: function(ext) {
        var me = this;
        var data = me.getView().config.data;
        var params = { _doctype: data._doctype, id: data.id, clone: data.clone };
        me.store.load({
            params:  Ext.Object.merge(params, ext || {})
        });
    },

    onLoadContent: function() {
        var me = this;
        me.initValues();
    },

    onWriteContent: function() {
        var me = this;
        me.initValues();
    },

    onCodeChange: function(_this, meta) {
        var me = this;
        function evalContext() {
            /* jshint -W061 */ // Разрешаем eval
            eval(meta.code);
            /* jshint +W061 */
        }
        evalContext.call(me.getView());
    },

    onViewChange: function(_this, meta) {
        var me = this,
            view = me.getView();
        view.removeAll();
        view.update('');
        view.add(meta.view);
    },

    onDataChange: function(_this, meta) {
        var me = this;
        if (meta.data && meta.data.id) {
            me.getView().config.data.id = meta.data.id;
            me.store.lastOptions.params.id = meta.data.id;
        }

        me.store.toolbar = meta.toolbar;
        djem.app.fireEvent('change.toolbar');

        me.getViewModel().setData(meta.data);
        var bind = me.getViewModel().bind('{name}', function() {
            // ждём окончания биндов, чтобы проинициализировать форму
            bind.destroy();
            me.initValues();
        });
    }
});
