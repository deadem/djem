Ext.define('djem.view.formBuilder.Property', {
  extend: 'Ext.grid.Panel',
  alias: ['view.formBuilder.property', 'widget.formBuilder.property'],
  requires: ['djem.view.formBuilder.PropertyController'],
  store: Ext.create('Ext.data.Store', { model: 'djem.model.formBuilder.Property', data: [] }),
  controller: 'formBuilder.property',
  columns: [
    { text: 'Name', flex: 1, dataIndex: 'name', editor: { allowBlank: false } },
    { text: 'Value', flex: 1, dataIndex: 'value', editor: { allowBlank: false } }
  ],
  plugins: [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 })],
  flex: 1
});