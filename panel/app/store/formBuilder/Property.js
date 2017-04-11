Ext.define('djem.store.formBuilder.Property', {
  extend: 'Ext.data.Store',
  alias: ['djem.store.formBuilder.property'],
  model: 'djem.model.formBuilder.Property',
  data: [
    { name: 'color', label: 'Цвет текста' }, { name: 'bgcolor', label: 'Цвет фона' },
    { name: 'validate', label: 'Ограничения' }, { name: 'fields', label: 'Поля' }, { name: 'store', label: 'Хранение' },
    { name: 'width', label: 'Ширина' }, { name: 'height', label: 'Высота' }, { name: 'name', label: 'Название' },
    { name: 'label', label: 'Надпись' }, { name: 'reference', label: 'Код' }
  ]
});