Ext.define('djem.view.formBuilder.ItemController', {
  alias: ['controller.formBuilder.item'],
  extend: 'Ext.app.ViewController',

  afterRender: function() {
    var me = this, view = this.getView();
    var dd = new Ext.dd.DDTarget(view.getId(), 'componentsDD', { ignoreSelf: false });
    // var override = { target: view };
    // var keymap = new Ext.util.KeyMap(me, {
    //   key: Ext.event.Event.DELETE,
    //   target: this.getView(),
    //   fn: function(keycode, e) {
    //     var me = this;
    //     var view = me.getView();
    //     e.stopEvent();
    //     me.deleteItem(view.getConfig('activeItem'));
    //   }
    // });
    // Ext.apply(keymap, overrides);
    // view.setKeyMap(keymap);
  },

  deleteItem: function(item) { console.log(item); }
});