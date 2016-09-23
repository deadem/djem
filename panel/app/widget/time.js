/* global Ext */
Ext.define('djem.widget.time', {
    extend: 'Ext.form.field.Time',
    alias: [ 'widget.djem.time' ],

    labelPad: null,
    labelSeparator: '',

    format: 'H:i',
    altFormats: 'H:i'
});
