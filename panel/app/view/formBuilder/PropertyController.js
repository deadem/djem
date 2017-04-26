Ext.define('djem.view.formBuilder.PropertyController', {
  alias: ['controller.formBuilder.property'],
  extend: 'Ext.app.ViewController',

  changeProperties: function(item) {
    var me = this;
    var view = me.getView();
    var store = view.getStore();
    var component = item.component;
    if ((component == undefined) || component.allows == undefined) {
      return false;
    }

    store = Ext.create('Ext.data.Store', { model: 'djem.model.formBuilder.Property' });

    view.setStore(store);
    Ext.each(component.allows, function(prop) {
      var tmp = prop.split('.');
      var prop = tmp[0];
      var child = tmp[1];
      if (child != undefined) {
        store.add({ 'name': prop + '.' + child, 'label': child, 'value': component[prop][child] });
      } else {
        store.add({ 'name': prop, 'label': prop, 'value': component[prop] });
      }
    });
    store.on('update', function(th, record, a, b) {
      var tmp = record.data.name.split('.');
      var prop = tmp[0];
      var child = tmp[1];
      if (child != undefined) {
        component[prop].setConfig(child, record.data.value);
      } else {
        component.setConfig(prop, record.data.value);
      }
    });
  }
});