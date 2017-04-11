Ext.define('djem.view.formBuilder.Component', {
  extend: 'Ext.panel.Panel',
  alias: ['view.formBuilder.component', 'widget.formBuilder.component'],
  requires: ['djem.view.formBuilder.ComponentController'],
  // store: Ext.create('Ext.data.Store', {
  //   model: 'djem.model.formBuilder.Component',
  //   data: [
  //     { name: 'Button', t: 'button', allowedProperties: ['text', 'reference', 'height', 'width', 'color', 'bgcolor'] },
  //     { name: 'Checkbox', t: 'djem.checkbox', allowedProperties: ['label', 'name', 'reference'] },
  //     { name: 'Date', t: 'djem.date', allowedProperties: ['label', 'name', 'reference', 'validate'] },
  //     { name: 'Grid', t: 'djem.grid.panel', allowedProperties: ['name', 'label', 'reference', 'store'] },
  //     { name: 'Image', t: 'djem.image', allowedProperties: ['name', 'label', 'reference', 'fields'] },
  //     { name: 'Select', t: 'djem.select', allowedProperties: ['name', 'label', 'reference', 'store'] },
  //     { name: 'StaticHtml', t: 'djem.html', allowedProperties: ['name', 'label', 'reference'] },
  //     { name: 'Text', t: 'djem.text', allowedProperties: ['name', 'label', 'reference', 'width', 'height'] },
  //     { name: 'TextArea', t: 'djem.textarea', allowedProperties: ['name', 'label', 'reference'] }
  //   ]
  // }),
  items: [
    {
      name: 'Button',
      type: 'Ext.Button',
      html: 'Button',
      flex: 1,
      cls: 'component',
      props: { width: 'auto', text: 'Новая кнопка' }
    },
    {
      name: 'Text',
      type: 'widget.djem.text',
      html: 'Text',
      flex: 1,
      cls: 'component',
      props: { width: 'auto', fieldLabel: 'Новое текстовое поле' }
    },
    {
      name: 'Layout',
      type: 'Ext.panel.Panel',
      html: 'Layout',
      flex: 1,
      cls: 'component',
      props: {
        width: 'auto',
        height: 'auto',
        layout: { type: 'hbox', align: 'stretch' },
        style: { 'outline': 'black solid 2px', 'min-height': '100px' },
        listeners: { click: function() { console.log('...'); } }
      }
    } // { name: 'Date', t: 'djem.date', html: 'Date', flex: 1 },
    // { name: 'Grid', t: 'widget.djem.grid.panel', html: 'Grid', flex: 1 },
    // { name: 'Image', t: 'djem.image', html: 'Image', flex: 1 },
    // { name: 'Select', t: 'djem.select', html: 'Select', flex: 1 }
  ],
  controller: 'formBuilder.component',
  // columns: [{ text: 'Component', flex: 1, dataIndex: 'name', editor: { allowBlank: false } }],
  flex: 1
  // draggable: { delegate: 'button' }
  // viewConfig: { plugins: { ptype: 'gridviewdragdrop', dragGroup: 'widgetDD' } }
});