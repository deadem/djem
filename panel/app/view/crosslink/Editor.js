/* global Ext */
Ext.define('djem.view.crosslink.Editor', {
  extend: 'Ext.window.Window',
  alias: ['widget.crosslink.Editor', 'widget.crosslink-editor'],

  requires: ['djem.view.crosslink.EditorController', 'djem.view.crosslink.EditorModel'],

  controller: 'crosslink-editor',
  viewModel: { type: 'crosslink-editor' },

  closable: false,
  autoShow: true,
  modal: true,
  bodyPadding: 10,
  title: 'Editor',
  width: '50%',
  height: '90%',
  layout: 'fit',

  html: '',
  buttons: ['->', { text: 'OK', handler: 'ok' }, { text: 'Cancel', handler: 'cancel' }]
});
