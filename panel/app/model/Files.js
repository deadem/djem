/* global Ext */
Ext.define('djem.model.Files', {
  extend: 'Ext.data.Model',

  fields: ['id', 'name', 'url', 'data', 'height', 'width', 'new', 'file', 'offset'],
  idProperty: '_'
});
