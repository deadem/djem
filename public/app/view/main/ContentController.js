Ext.define('djem.view.main.ContentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-content',

    loadingMask: null,

    updateButtons: function() {
        var me = this;
        djem.app.fireEvent('update.toolbar', 'save', { action: me.getView().isDirty() ? 'enable' : 'disable' });
    },

    onDirtyChange: function(_this, dirty, eOpts) {
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
        Ext.each(me.getView().getForm().getFields().items, function(obj, i) {
            values = Ext.Object.merge(values, obj.getSubmitData());
            fields.push({ name: obj.name, type: 'string' });
        });

        me.loadingMask && me.loadingMask.show();

        var params = Ext.clone(me.store.lastOptions.params);
        me.store.loadData([], false); // drop data
        me.store.setModel(Ext.create('djem.model.Content', { fields: fields }));
        me.store.add([ values ]);
        me.store.sync({
            params: params,
            callback: function() {
                me.loadingMask && me.loadingMask.hide();
            }
        });
    },

    onClose: function() {
        this.getView().destroy();
    },

    init: function(_this) {
        var me = this;
        me.getView().on('click.toolbar', function(ref) {
            var actions = {
                'save': function() { me.getView().fireEvent('validate'); },
                'close': function() { me.onClose(); }
            };
            (actions[ref] || function(){})();
        });
        me.getView().getForm().on('dataReady', function() { me.onSyncData(); });
    },

    initValues: function() {
        var me = this;
        Ext.each(me.getView().getForm().getFields().items, function(obj) {
            obj.resetOriginalValue();
        });
        me.getView().getForm().checkDirty();
        me.updateButtons();
    },

    initViewModel: function(_this) {
        var me = this;
        var data = me.getView().config.data;

        me.store = Ext.create('djem.store.main.Content')
            .on('load', function() { me.onLoadContent.apply(me, arguments) })
            .on('write', function() { me.onWriteContent.apply(me, arguments) })
            .on('metachange', function() { me.onViewChange.apply(me, arguments) }, me, { single: true })
            .on('metachange', function() { me.onCodeChange.apply(me, arguments) }, me, { single: true })
            .on('metachange', function() { me.onDataChange.apply(me, arguments) }, me);

        me.loadingMask = new Ext.LoadMask({
            target: me.getView().up(),
            store: me.store
        });

        me.store.load({
            params: { _doctype: data._doctype, _model: data._model, id: data.id }
        });
    },

    onLoadContent: function(_this, records, successful, eOpts) {
        var me = this;
        me.initValues();
    },

    onWriteContent: function(store, operation, eOpts) {
        var me = this;
        me.initValues();
    },

    onCodeChange: function(_this, meta, eOpts) {
        var me = this;
        function evalContext() {
            eval(meta.code);
        }
        evalContext.call(me.getView());
    },

    onViewChange: function(_this, meta, eOpts) {
        var me = this;
        me.getView().add(meta.view);
    },

    onDataChange: function(_this, meta, eOpts) {
        var me = this;
        if (meta.data && meta.data._id) {
            me.getView().config.data.id = meta.data._id;
            me.store.lastOptions.params.id = meta.data._id;
        }
        me.getViewModel().setData(meta.data);
        var bind = me.getViewModel().bind('{name}', function() {
            // ждём окончания биндов, чтобы проинициализировать форму
            bind.destroy();
            me.initValues();
        });
    }
});
