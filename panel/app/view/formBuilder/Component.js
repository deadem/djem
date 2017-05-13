Ext.define('djem.view.formBuilder.Component', {
  extend: 'Ext.panel.Panel',
  alias: ['view.formBuilder.component', 'widget.formBuilder.component'],
  requires: ['djem.view.formBuilder.ComponentController'],
  items: [
    {
      name: 'Layout',
      type: 'Ext.panel.Panel',
      picture: 'f614',
      props: {
        width: 'auto',
        height: 'auto',
        cls: 'layout',
        layout: { type: 'hbox', align: 'stretch' },
        // style: {  },
        allows: ['width', 'height', 'layout.align', 'layout.direction']
      },
    },
    {
      name: 'Text',
      type: 'widget.djem.text',
      picture: 'f261',
      props: { width: 'auto', fieldLabel: 'Новое текстовое поле', allows: ['width', 'fieldLabel'] },
    },
    {
      name: 'Textarea',
      type: 'widget.djem.textarea',
      picture: 'f571',
      props: { width: 'auto', fieldLabel: 'Новый текстэри', allows: ['width', 'height', 'fieldLabel'] },
    },
    {
      name: 'Button',
      type: 'Ext.Button',
      picture: 'f1b7',
      props: { width: 'auto', text: 'Новая кнопка', allows: ['width', 'height', 'text', 'textAlign'] },
    },
    {
      name: 'Checkbox',
      type: 'widget.djem.checkbox',
      picture: 'f134',
      props: { width: 'auto', boxLabel: 'Новенький чекбокс', allows: ['width', 'height', 'boxLabel'] },
    },
    {
      name: 'Date',
      type: 'widget.djem.date',
      picture: 'f0ed',
      props: { width: 'auto', fieldLabel: 'Новая дата', allows: ['width', 'height', 'fieldLabel'] },
    },
    {
      name: 'Image gallery',
      type: 'widget.djem.images',
      picture: 'f254',
      props: {
        style: { 'outline': 'black dotted 1px', 'outline-offset': '-1px', 'min-height': '100px' },
        width: 'auto',
        allows: ['width', 'height']
      },
    },
    {
      name: 'Select',
      type: 'widget.djem.select',
      picture: 'f04a',
      props: { width: 'auto', fieldLabel: 'Новый селект', allows: ['width', 'height', 'fieldLabel'] },
    },
    {
      name: 'Static html',
      type: 'widget.djem.html',
      picture: 'f626',
      props: { width: 'auto', fieldLabel: 'Новый статический хтмл', allows: ['width', 'height', 'fieldLabel'] },
    }
  ],
  controller: 'formBuilder.component'
});