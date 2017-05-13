// /* global Ext */
// var properties = {
//   color: { name: 'Цвет текста' },
//   bgcolor: { name: 'Цвет фона' },
//   validate: { name: 'Ограничения' },
//   fields: { name: 'Поля' },
//   store: { name: 'Хранение' },
//   width: { name: 'Ширина' },
//   height: { name: 'Высота' },
//   name: { name: 'Название' },
//   label: { name: 'Надпись' },
//   reference: { name: 'Код' }
// };

// var components = [
//   {
//     // xtype: 'button',
//     tooltip: 'Button',
//     widget: 'button',
//     // scale: 'large',
//     text: 'Button',
//     properties: ['text', 'reference', 'height', 'width', 'color', 'bgcolor']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'Checkbox',
//     widget: 'djem.checkbox',
//     // scale: 'large',
//     text: 'Checkbox',
//     properties: ['label', 'name', 'reference']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'Date',
//     widget: 'djem.date',
//     // scale: 'large',
//     text: 'Date',
//     properties: ['label', 'name', 'reference', 'validate']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'Grid',
//     widget: 'djem.grid.panel',
//     // scale: 'large',
//     text: 'Grid',
//     properties: ['name', 'label', 'reference', 'store']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'Image',
//     widget: 'djem.image',
//     // scale: 'large',
//     text: 'Image',
//     properties: ['name', 'label', 'reference', 'fields']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'Select',
//     widget: 'djem.select',
//     // scale: 'large',
//     text: 'Select',
//     properties: ['name', 'label', 'reference', 'store']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'StaticHtml',
//     widget: 'djem.html',
//     // scale: 'large',
//     text: 'StaticHtml',
//     properties: ['name', 'label', 'reference']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'Text',
//     widget: 'djem.text',
//     // scale: 'large',
//     text: 'Text',
//     properties: ['name', 'label', 'reference', 'width', 'height']
//   },
//   {
//     // xtype: 'button',
//     tooltip: 'TextArea',
//     widget: 'djem.textarea',
//     // scale: 'large',
//     text: 'TextArea',
//     properties: ['name', 'label', 'reference']
//   }
// ];

// var canvas = Ext.create('Ext.panel.Panel', {
//   xtype: 'panel',
//   flex: 1,
//   cls: 'canvas',
//   layout: { type: 'vbox', align: 'stretch' },
//   // draggable: true,
//   items: [
//     { xtype: 'djem.text', fieldLabel: 'Тестовый добавленный элемент', disabled: true },
//     { xtype: 'djem.text', fieldLabel: 'Еще один добавленный элемент', disabled: true }
//   ],
//   viewConfig: { init: function() { console.log('init'); } }, //dropZone: new Ext.view.DropZone({ ddGroup: 'widgetDD' })
//   listeners: {
//     afterrender: function(a, b) {
//       var me = this;

//       // var view = this.getView();
//       console.log(me.getViewModel());
//     }
//   }
// })

// Ext.define('djem.widget.contentor', {
//   extend: 'Ext.Panel',
//   alias: ['widget.djem.contentor'],

//   config: {
//     controller: Ext.create('Ext.app.ViewController', {
//       init: function() {
//         var me = this, view = me.getView();
//         // console.log(canvas.getEl());
//         // debugger;
//         // view.setEl(canvas.getEl());
//         // view.dropZone = new Ext.view.DropZone({ ddGroup: 'widgetDD' });
//       }
//     })
//   },

//   layout: { type: 'hbox', align: 'stretch' },
//   items: [
//     {
//       layout: { type: 'vbox', align: 'stretch' },
//       items: [{
//         xtype: 'panel',
//         layout: { type: 'vbox', align: 'stretch' },
//         width: 250,
//         items: [
//           Ext.create('Ext.grid.Panel', {
//             store: Ext.create('Ext.data.Store', {
//               model: Ext.define('Component',
//                                 { extend: 'Ext.data.Model', fields: ['tooltip', 'text', 'widget', 'properties'] }),
//               data: components
//             }),
//             columns: [{ text: 'Component', flex: 1, dataIndex: 'text', editor: { allowBlank: false } }],
//             viewConfig: { plugins: { ptype: 'gridviewdragdrop', dragGroup: 'widgetDD' } }
//           }),
//           Ext.create('Ext.grid.Panel', {
//             store: Ext.create('Ext.data.Store', {
//               model: Ext.define('Property', { extend: 'Ext.data.Model', fields: ['name', 'value'] }),
//               data: [
//                 { name: 'Цвет текста', value: '#000000' }, { name: 'Цвет фона', value: '#ff0000' },
//                 { name: 'Ограничения', value: '' }, { name: 'Поля', value: '' }, { name: 'Хранение', value: '' },
//                 { name: 'Ширина', value: '100%' }, { name: 'Высота', value: '100%' },
//                 { name: 'Название', value: 'Название 1' }, { name: 'Надпись', value: 'Поле 1' },
//                 { name: 'Код', value: 'element_1' }
//               ]
//             }),
//             columns: [
//               { text: 'Name', flex: 1, dataIndex: 'name', editor: { allowBlank: false } },
//               { text: 'Value', flex: 1, dataIndex: 'value', editor: { allowBlank: false } }
//             ],
//             plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
//           })
//         ]
//       }]
//     },
//     // Типо поле для добавления
//     canvas
//   ]
// });
