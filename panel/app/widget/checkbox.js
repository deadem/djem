/* global Ext */
Ext.define('djem.widget.checkbox', {
    extend: 'Ext.form.field.Checkbox',
    alias: [ 'widget.djem.checkbox' ],

    labelPad: null,
    labelSeparator: '',

    config: {
        inputValue: true,
        uncheckedValue: false
    }
});
