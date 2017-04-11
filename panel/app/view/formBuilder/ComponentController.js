Ext.define('djem.view.formBuilder.ComponentController', {
  alias: ['controller.formBuilder.component'],
  extend: 'Ext.app.ViewController',

  afterRender: function() {
    var me = this, view = me.getView();
    var overrides = {
      item: {},
      startDrag: function(x, y) { this.el = Ext.get(this.getEl()); },
      onDrag: function() {},
      onDragDrop: function(e, id) {
        var component = Ext.create(this.item.type, this.item.props);
        var dd;
        Ext.getCmp(id).add(component);

        // Ext.get(id).appendChild(component.el);

        dd = new Ext.dd.DDTarget(component.el.dom, 'componentsDD', { ignoreSelf: false });

        console.log(component);
        console.log(dd);

      },
      onDragOver: function(e, id) { Ext.getCmp(id).setStyle({ 'background': 'blue' }); },
      onDragOut: function(e, id) { Ext.getCmp(id).setStyle({ 'background': 'none' }); },
      onInvalidDrop: function() {},
      endDrag: function(e) {
        Ext.get(this.getEl()).setLeft(0);
        Ext.get(this.getEl()).setTop(0);
      }
    };
    Ext.each(view.items.items, function(item) {
      var dd = new Ext.dd.DD(item, 'componentsDD', { isTarget: false });
      overrides.item = item;
      Ext.apply(dd, overrides);
    });
  }
});