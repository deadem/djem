/* global Ext */
Ext.define('djem.view.main.Grid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.main-grid',

  requires: ['djem.view.main.GridController', 'djem.view.main.GridModel', 'djem.widget.grid.image'],

  controller: 'main-grid',
  viewModel: { type: 'main-grid' },

  viewConfig: { getRowClass: function(record) { return record.get('djem-grid-color') || ''; } },

  listeners: { rowdblclick: 'rowdblclick', itemkeydown: 'itemkeydown', cellcontextmenu: 'cellcontextmenu', afterlayout: 'showFilter' }
});
