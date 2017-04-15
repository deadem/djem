/* global Ext */
Ext.define('djem.view.main.Grid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.main-grid',

  requires: ['djem.view.main.GridController', 'djem.view.main.GridModel', 'djem.widget.grid.image'],

  controller: 'main-grid',
  viewModel: { type: 'main-grid' },

  viewConfig: {
    config: { lastScrollPosition: false },

    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true,

    getRowClass: function(record) { return record.get('djem-grid-color') || ''; },

    afterComponentLayout: function() {
      var me = this, pos = me.config.lastScrollPosition, result = me.superclass.afterComponentLayout.apply(me, arguments);
      if (pos) {
        // restore scroll position
        me.scrollTo(pos.x, pos.y);
        me.config.lastScrollPosition = false;
      }

      return result;
    }
  },

  listeners: { rowdblclick: 'rowdblclick', itemkeydown: 'itemkeydown', cellcontextmenu: 'cellcontextmenu', afterlayout: 'showFilter' }
});
