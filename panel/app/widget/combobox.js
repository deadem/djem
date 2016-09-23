/* global Ext */
Ext.define('djem.widget.combobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: [ 'widget.djem.combobox', 'widget.djem.combo', 'widget.djem.select' ],

    labelSeparator: '',
    labelPad: null,
    labelAlign: 'top',
    pageSize: 100,
    queryParam: 'filter',
    minChars: 1,
    forceSelection: true,
    queryMode: 'remote',
    displayField: 'text',
    valueField: 'value',
    autoSelect: false,
    triggerAction: 'query',
    selectOnFocus: true,
    changingFilters: true,

    requires: [
        'djem.store.ComboBox'
    ],

    afterRender: function() {
        var me = this;
        me.getEl().on('click', function() {
            if (me.queryMode !== 'remote' || me.getStore().isLoaded()) {
                me.expand();
            } else {
                me.getStore().load({
                    callback: function() {
                        me.expand();
                    }
                });
            }
        });
        me.callParent(arguments);
    },

    setValue: function(value, doSelect) {
        var me = this;
        if (Ext.isObject(value) && !value.isModel && me.queryMode == 'remote') {
            me.store.clearFilter(true);
            me.store.loadData([ value ], false);
            me.store.loadCount = 0;
            me.callParent([ value[me.valueField], doSelect ]);
        } else {
            me.callParent(arguments);
        }
    },

    initStore: function() {
        var me = this;
        if (me.queryMode == 'remote') {
            me.setStore(Ext.create('djem.store.ComboBox'));
            var store = me.getStore();
            var view = me.up('main-content') || me.up('crosslink-editor');
            store.getProxy().setExtraParams({
                _doctype: view.config.data._doctype,
                id: view.config.data.id,
                field: me.name
            });
        }
    },

    listeners: {
        added: function() {
            return this.initStore();
        },
        initStore: function() {
            return this.initStore();
        },
        change: function(field, newValue) {
            if (Ext.isEmpty(newValue)) {
                field.removeCls('app-field-filled');
            } else {
                field.addCls('app-field-filled');
            }
        }
    }
});
