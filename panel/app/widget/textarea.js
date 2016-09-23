/* global Ext */
Ext.define('djem.widget.textarea', {
    extend: 'Ext.form.field.TextArea',
    alias: [ 'widget.djem.textarea' ],

    labelPad: null,
    labelAlign: 'top',
    labelSeparator: '',

    listeners: {
        change: function(field, newValue) {
            if (Ext.isEmpty(newValue)) {
                field.removeCls('app-field-filled');
            } else {
                field.addCls('app-field-filled');
            }
        }
    }
});
