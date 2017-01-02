/* global Ext */
Ext.define('djem.widget.text', {
  extend: 'Ext.form.field.Text',
  alias: ['widget.djem.text'],

  labelAlign: 'top',
  labelPad: null,
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
