Ext.define('djem.view.formBuilder.ComponentController', {
  alias: ['controller.formBuilder.component'],
  extend: 'Ext.app.ViewController',

  getOverrides: function(view) {
    return {
      item: {},
      startDrag: function(x, y) { this.el = Ext.get(this.getEl()); },
      onDrag: function() {},
      onDragDrop: function(e, id) {
        var component = Ext.create(this.item.type, this.item.props);
        if (component.deactivate != undefined) {
          component.deactivate()
        }
        Ext.getCmp(id).add(component);
        view.attachDDTarget(component);
      },
      onDragOver: function(e, id) {
        Ext.getCmp(id).setStyle({ 'background': 'rgba(0,0,128,0.5)' });
        return false;
      },
      onDragOut: function(e, id) { Ext.getCmp(id).setStyle({ 'background': 'none' }); },
      onInvalidDrop: function() {},
      endDrag: function(e) {
        Ext.get(this.getEl()).setLeft(0);
        Ext.get(this.getEl()).setTop(0);
      }
    };
  },

  beforeRender: function() {
    var me = this;
    var view = me.getView();
    Ext.each(view.items.items, function(item) {
      item.html = '<div class="buttonField"><span class="icon">&#x' + item.picture + ';</span><span class="text">' +
                  item.name + '</span></div>';
    });
  },

  afterRender: function() {
    var me = this, view = me.getView();
    var overrides = me.getOverrides(me);
    Ext.each(view.items.items, function(item) {
      var dd = new Ext.dd.DD(item, 'componentsDD', { isTarget: false });
      overrides.item = item;
      Ext.apply(dd, overrides);
    });
  },
  attachDDTarget: function(component) {
    var me = this;
    var overrides = me.getOverrides(me);
    var dd = new Ext.dd.DDTarget(component.el.dom, 'componentsDD', { ignoreSelf: false });
    overrides.item = component;
    Ext.apply(dd, overrides);
  }
});