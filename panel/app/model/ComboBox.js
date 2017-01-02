/* global Ext */
Ext.define('djem.model.ComboBox', {
  extend: 'Ext.data.Model',

  fields: ['value', 'text'],
  idProperty: 'value'
});
