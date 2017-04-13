Ext.define('djem.view.formBuilder.PropertyController', {
  alias: ['controller.formBuilder.property'],
  extend: 'Ext.app.ViewController',
  changeProperties: function(propsAllow) {
    var me = this;
    var view = me.getView();
    var store = view.getStore();
    var rows = this.getView().items.items[0].dataSource.data.items;
    //this.getView().columns

    store.empty!!!!

            Ext.each(rows, function(row) {
              if (propsAllow.indexOf(row.data.name) === -1) {
                delete row;
              }
            });
  }
});