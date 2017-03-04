/* global Ext */
Ext.define('djem.view.crosslink.Files', {
  extend: 'Ext.view.View',
  alias: 'widget.crosslink.Files',

  config: { selectionModel: { mode: 'MULTI' } },

  cls: 'x-form-crosslink-files-wrap',
  requires: [
    'djem.view.crosslink.FilesController', 'djem.view.crosslink.FilesModel', 'djem.view.crosslink.FileField',
    'djem.store.CrossLink', 'djem.model.Files', 'djem.view.crosslink.Editor'
  ],

  deleteImages: function(record) {
    var me = this;

    if (me.getSelection().length) {
      Ext.each(me.getSelection(), function(selection) { selection.drop(); });
    } else {
      me.getStore().remove(record);
    }
  },

  moveItemOnFirst: function(record) {
    var store = this.getStore();
    store.remove(record);
    store.insert(0, record);
  },

  listeners: {
    afterrender: { fn: 'initAfterRender', options: { single: true } },
    beforedestroy: 'onBeforeDestroy',
    itemdblclick: 'onItemDblClick'
  },

  controller: 'crosslink-files',
  viewModel: { type: 'crosslink-files' },
  deferEmptyText: false,

  bindStore: function(data) {
    var me = this;
    if (data === null) {
      data = [];
    }
    if (data && (typeof data == 'object' || typeof data == 'string') && !(data instanceof Ext.Base)) {
      if (me.single) {
        if (typeof data == 'string') {
          data = [{ url: data }];
        } else if (!Array.isArray(data)) {
          data = [data];
        }
      }

      if (Array.isArray(data)) {
        // если передали массив - создадим с ним новый стор
        var store = me.getStore() || Ext.create('djem.store.CrossLink', { model: 'djem.model.Files' });
        store.removeAll();
        store.add(data);
        arguments[0] = store;

        Ext.defer(function() { me.fireEvent('initValue'); }, 1);
      }
    }
    this.callParent(arguments);
  },

  selectedItemCls: 'x-grid-item-selected',
  itemSelector: 'div.thumb-wrap',
  tpl: [
    '<tpl for=".">', '<div class="thumb-wrap {new}">', '<a href="#" class="trash">&#xF156;</a>',
    '<div class="thumb" style="',
    'background-repeat: no-repeat;background-image: url({url});background-position:{calcOffset};background-size:100%;background-size:{calcZoom}',
    '"></div>', '<span>{name}</span>', '</div>', '</tpl>', '<label>',
    '<svg width="100%" height="100%" viewBox="0 0 64 64"><text x="0" y="58" fill="silver">&#xf100;</text></svg>',
    '<input type="file" multiple="" onchange="Ext.get(this.parentNode.parentNode).fireEvent(\'filechange\', event, this);">',
    '</label>'
  ]
});
