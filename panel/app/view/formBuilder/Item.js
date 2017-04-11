Ext.define('djem.view.formBuilder.Item', {
  extend: 'Ext.panel.Panel',
  alias: ['view.formBuilder.item', 'widget.formBuilder.item'],
  requires: ['djem.view.formBuilder.ItemController'],
  // store: Ext.create('Ext.data.Store', {

  // }),
  controller: 'formBuilder.item',
  cls: 'canvas',
  layout: { type: 'vbox', align: 'stretch' },
  flex: 6
  // tpl: ['<div>', '</div>'],
  // itemSelector: 'li'
  // getItemSelector: function() {

  // },
  // getRecord: function(el) {
  //   // console.log('------------------');
  //   // console.log('------------------');
  //   // console.log('------------------');
  //   // console.log(this);
  //   // console.log(el);
  //   // console.log('------------------');
  //   // console.log('------------------');
  //   // console.log('------------------');
  // }

  // dropZone: Ext.view.DropZone({ view: this, ddGroup: 'widgetDD' })

});