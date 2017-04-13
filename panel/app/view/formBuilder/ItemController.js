Ext.define('djem.view.formBuilder.ItemController', {
  alias: ['controller.formBuilder.item'],
  extend: 'Ext.app.ViewController',

  afterRender: function() {
    var me = this, view = this.getView();
    var dd = new Ext.dd.DDTarget(view.getId(), 'componentsDD', { ignoreSelf: false });
  }
  // selectItem: function(e) {
  //   var me = this;
  //   var view = me.getView();
  //   var item = Ext.get(e.parentEvent.target);
  //   item.addCls('selected');
  //   view.fireEvent('selected');
  //   view.getEl().fireEvent('selected');
  // }

});