/* global Ext*/
Ext.define('djem.view.main.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.main-tree',

  config: { header: false, hideHeaders: true, tools: [], cls: 'main-tree', singleExpand: true },

  listeners: {
    cellclick: function(table, td, i, record) {
      var me = this;
      me.selection.expand();
      return false;
    }
  },

  columns: [{
    renderer: function(value, data) {
      var sublevel = data.record.getDepth() > 1;

      var row = [
        '<div class="{0}">',                                                   //
        new Array(data.record.getDepth()).join('<div class="padding"></div>'), //
        '<div class="icon {1}-{2}">{3}</div>',                                 //
        '<div class="title">',                                                 //
        '<div class="name">{4}</div>',                                         //
        '<div class="desc">{5}</div>',                                         //
        '</div>',                                                              //
        '<div class="arrow">&#xF35D;</div>',                                   //
        '</div>',                                                              //
        ''
      ];

      return Ext.String.format(row.join(''),                          //
                               sublevel ? 'second' : 'first',         //
                               sublevel ? 'color' : 'bgcolor',        //
                               data.record.get('color') || 'gray',    //
                               data.record.get('icon') || '&#xE2C7;', //
                               data.record.get('text'),               //
                               data.record.get('description'),        //
                               '');
    },
    flex: 1
  }]
});
