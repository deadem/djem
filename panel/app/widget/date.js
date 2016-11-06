/* global Ext */
Ext.define('djem.widget.date', {
    extend: 'Ext.form.field.Date',
    alias: [ 'widget.djem.date' ],

    labelSeparator: '',
    labelPad: null,
    format: 'Y-m-d',
    altFormats: 'Y-m-d|Y-m-d H:i:s',

    listeners: {
        added: function() {
            var me = this, picker = me.getPicker();

            picker.shadow = false;
            picker.border = false;
            picker.addCls('elevation-24');
            picker.setWidth(300);
        }
    }
});
