// Ext.define('modelProperty', { alias: ['model.property'], extend: 'Ext.data.Model', fields: ['name', 'value'] });
// Ext.define('modelComponent',
//            { alias: ['model.component'], extend: 'Ext.data.Model', fields: ['name', 'xtype', 'allowedProperties'] });
// Ext.define('modelItem',
//            { alias: ['model.item'], extend: 'Ext.data.Model', fields: ['name', 'xtype', 'properties', 'items'] });

// Ext.define('storeProperty', {
//   extend: 'Ext.data.Store',
//   alias: ['store.property'],
//   model: 'modelProperty',
//   data: [
//     { name: 'color', label: 'Цвет текста' }, { name: 'bgcolor', label: 'Цвет фона' },
//     { name: 'validate', label: 'Ограничения' }, { name: 'fields', label: 'Поля' }, { name: 'store', label: 'Хранение' },
//     { name: 'width', label: 'Ширина' }, { name: 'height', label: 'Высота' }, { name: 'name', label: 'Название' },
//     { name: 'label', label: 'Надпись' }, { name: 'reference', label: 'Код' }
//   ]
// });
// Ext.define('storeComponent', {
//   extend: 'Ext.data.Store',
//   alias: ['store.component'],
//   model: 'modelComponent',
//   data: [
//     {
//       name: 'Button',
//       xtype: 'button',
//       allowedProperties: ['text', 'reference', 'height', 'width', 'color', 'bgcolor']
//     },
//     { name: 'Checkbox', xtype: 'djem.checkbox', allowedProperties: ['label', 'name', 'reference'] },
//     { name: 'Date', xtype: 'djem.date', allowedProperties: ['label', 'name', 'reference', 'validate'] },
//     { name: 'Grid', xtype: 'djem.grid.panel', allowedProperties: ['name', 'label', 'reference', 'store'] },
//     { name: 'Image', xtype: 'djem.image', allowedProperties: ['name', 'label', 'reference', 'fields'] },
//     { name: 'Select', xtype: 'djem.select', allowedProperties: ['name', 'label', 'reference', 'store'] },
//     { name: 'StaticHtml', xtype: 'djem.html', allowedProperties: ['name', 'label', 'reference'] },
//     { name: 'Text', xtype: 'djem.text', allowedProperties: ['name', 'label', 'reference', 'width', 'height'] },
//     { name: 'TextArea', xtype: 'djem.textarea', allowedProperties: ['name', 'label', 'reference'] }
//   ]
// });
// Ext.define('storeItem', { alias: ['store.item'], extend: 'Ext.data.Store', model: 'modelItem', data: [] });

// Ext.define('djem.controller.formBuilder.property', { alias: ['controller.controllerProperty'], extend: 'Ext.app.ViewController' });
// Ext.define('djem.controller.formBuilder.component',
//            { alias: ['controller.controllerComponent'], extend: 'Ext.app.ViewController' });
// Ext.define('djem.controller.formBuilder.item',
//            { alias: ['controller.controllerItem'], extend: 'Ext.app.ViewController' });
// Ext.define('djem.controller.formBuilder.general',
//            { alias: ['controller.controllerGeneral'], extend: 'Ext.app.ViewController' });

// Ext.define('djem.widget.viewProperty', {
//   extend: 'Ext.grid.Panel',
//   alias: ['widget.djem.viewProperty'],
//   requires: ['store.property'],
//   store: 'storeProperty',
//   controller: 'controllerProperty',
//   columns: [
//     { text: 'Name', flex: 1, dataIndex: 'name', editor: { allowBlank: false } },
//     { text: 'Value', flex: 1, dataIndex: 'value', editor: { allowBlank: false } }
//   ],
//   plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })]
// });

// Ext.define('djem.widget.viewComponent', {
//   extend: 'Ext.grid.Panel',
//   alias: ['widget.djem.viewComponent'],
//   requires: ['store.component'],
//   store: 'storeComponent',
//   controller: 'controllerComponent',
//   columns: [{ text: 'Component', flex: 1, dataIndex: 'name', editor: { allowBlank: false } }],
// });

// Ext.define('djem.widget.viewItem', {
//   extend: 'Ext.panel.Panel',
//   alias: ['widget.djem.viewItem'],
//   requires: ['store.item'],
//   store: 'storeItem',
//   controller: 'controllerItem',
//   // flex: 1,
//   cls: 'canvas',
//   layout: { type: 'vbox', align: 'stretch' },
//   items: [{ xtype: 'button', flex: 1, text: 'First item' }, { xtype: 'button', flex: 1, text: 'Second item' }]
// });

// Ext.define('djem.widget.contentor', {
//   extend: 'Ext.panel.Panel',
//   alias: ['widget.djem.contentor'],
//   controller: 'controllerGeneral',
//   items: [
//     {
//       layout: { type: 'hbox', align: 'stretch' },
//       items: [{ xtype: 'djem.viewComponent' }, { xtype: 'djem.viewProperty' }]
//     },
//     { xtype: 'djem.viewItem' }
//   ]
// });
