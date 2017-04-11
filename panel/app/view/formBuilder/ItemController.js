Ext.define('djem.view.formBuilder.ItemController', {
  alias: ['controller.formBuilder.item'],
  extend: 'Ext.app.ViewController',

  afterRender: function() {
    var me = this, view = this.getView();
    var dd = new Ext.dd.DDTarget(view.getId(), 'componentsDD', { ignoreSelf: false });
  }
});