/* global Ext */
Ext.define('djem.model.Tag', {
  extend: 'Ext.data.Model',

  fields: ['value', 'text'],
  idProperty: 'value'
});
