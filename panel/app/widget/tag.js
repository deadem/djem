/* global Ext */
Ext.define('djem.widget.tag', {
    extend: 'Ext.form.field.Tag',
    alias: ['widget.djem.tag'],

    labelPad: null,
    labelSeparator: '',
    labelAlign: 'top',
    pageSize: 100,
    minChars: 1,
    filterPickList: true,
    displayField: 'text',
    valueField: 'value',
    queryMode: 'remote',
    queryParam: 'filter',

    requires: ['djem.store.Tag'],

    initField: function() {
        var me = this;

        me.valueField = 'value';
        me.displayField = 'text';

        this.callParent(arguments);
    },

    setValue: function(value, doSelect) {
        var me = this;
        if (Ext.isArray(value)) {
            value = Ext.Array.unique(value);
        }
        if (Ext.isEmpty(value)) {
            me.pickerSelectionModel.deselectAll();
        }

        if (Ext.isArray(value) && (!value.length || Ext.isObject(value[0])) && !value.isModel) {
            var values = [];
            if (me.queryMode == 'remote') {
                var clearStore = function(store, value) {
                    if (store.isEmptyStore) {
                        return;
                    }
                    store.clearFilter(true);
                    store.loadData(value || [], false);
                    store.loadCount = 0;
                };
                clearStore(me.store, value);
                clearStore(me.valueStore);
                me.lastQuery = undefined;
            }

            console.log(me.store);

            for (var i = 0, len = value.length; i < len; ++i) {
                values.push(value[i][me.valueField]);
            }
            return me.callParent([values, doSelect]);
        }

        return me.callParent(arguments);
    },

    listeners: {
        added: function() {
            var me = this;
            if (me.queryMode == 'remote') {
                me.setStore(Ext.create('djem.store.Tag'));
            }

            var store = me.getStore();
            if (store && me.queryMode == 'remote') {
                var view = me.up('main-content') || me.up('crosslink-editor');
                store.getProxy().setExtraParams(
                  { _doctype: view.config.data._doctype, id: view.config.data.id, field: me.name });
            }
        },
        change: function(field, newValue) {
            this.completeEdit();
            if (Ext.isEmpty(newValue)) {
                field.removeCls('app-field-filled');
            } else {
                field.addCls('app-field-filled');
            }
        }
    }
});
