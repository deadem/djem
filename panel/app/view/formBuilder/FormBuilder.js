Ext.define('djem.view.formBuilder.FormBuilder', {
  extend: 'Ext.panel.Panel',
  alias: ['widget.djem.formBuilder'],
  requires: ['djem.view.formBuilder.FormBuilderController'],
  controller: 'FormBuilderController',
  // store: Ext.create('Ext.data.Store', {
  //   model: ''
  // });
  layout: { type: 'hbox', align: 'stretch' },
  items: [{
    layout: { type: 'hbox', align: 'stretch' },
    flex: 1,
    items: [
      {
        layout: { type: 'vbox', align: 'stretch' },
        flex: 1,
        items: [{ xtype: 'formBuilder.component' }, { xtype: 'formBuilder.property' }]
      },
      { xtype: 'formBuilder.item' }
    ]
  }],
  listeners: { click: { element: 'el', fn: 'clickItem' } }

});