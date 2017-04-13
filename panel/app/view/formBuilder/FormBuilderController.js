Ext.define('djem.view.formBuilder.FormBuilderController', {
  alias: ['controller.FormBuilderController'],
  extend: 'Ext.app.ViewController',
  clickItem: function(e) {
    var me = this;
    var view = me.getView();
    var item = Ext.get(e.parentEvent.target);
    item.addCls('selected');
    view.items.items[0].items.items[0].items.items[1].getController().changeProperties(item.component.allows);
  }
});
