/* global Ext */
Ext.define('djem.view.crosslink.EditorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.crosslink-editor',

  ok: function() {
    var me = this;
    me.getView().fireEvent('update');
    me.getView().destroy();
  },

  cancel: function() { this.getView().destroy(); }
});
