/* global Ext */
Ext.define('djem.widget.textarea', {
    extend: 'Ext.form.field.TextArea',
    alias: [ 'widget.djem.textarea' ],

    labelPad: null,
    labelAlign: 'top',
    labelSeparator: '',

    listeners: {
        change: function(field, newValue) {
            if (newValue) {
                field.addCls('app-field-filled');
            } else {
                field.removeCls('app-field-filled');
            }
        }
    }
});
