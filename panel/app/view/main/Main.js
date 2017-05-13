/* global Ext*/
Ext.define('djem.view.main.Main', {
  extend: 'Ext.container.Container',
  alias: 'widget.app-main',

  requires: [
    'Ext.form.Label',

    'djem.view.main.MainController',
    'djem.view.main.Grid',
    'djem.view.main.Content',
    'djem.view.main.Toolbar',
    'djem.view.main.Tree',

    'widget.image',

    'djem.widget.html',
    'djem.widget.image',
    'djem.widget.images',
    'djem.widget.tag',
    'djem.widget.text',
    'djem.widget.textarea',
    'djem.widget.checkbox',
    'djem.widget.combobox',
    'djem.widget.date',
    'djem.widget.time',
    'djem.widget.grid.panel',
    'djem.widget.searchToolbarField',
    'djem.model.formBuilder.Component',
    'djem.model.formBuilder.Property',
    'djem.model.formBuilder.Item',
    'djem.view.formBuilder.Component',
    'djem.view.formBuilder.Property',
    'djem.view.formBuilder.Item',
    'djem.view.formBuilder.FormBuilder'
  ],
  // 'djem.store.formBuilder.Component',
  // 'djem.store.formBuilder.Property',
  // 'djem.store.formBuilder.Item',

  getToolbar: function() { return this.lookupReference('toolbar'); },

  controller: 'main',

  layout: 'border',
  items: [
    { region: 'north', xtype: 'main-toolbar', cls: 'top-toolbar', reference: 'toolbar' }, {
      region: 'center',
      xtype: 'tabpanel',
      reference: 'tabs',
      cls: 'top-panel',
      items: [{
        glyph: 'xF2DC@Icons',
        layout: 'border',
        reference: 'main',
        listeners: {
          'click.toolbar': function(ref, params) {
            var toolbar = this.down('main-grid{display!="none"}');
            if (toolbar) {
              toolbar.fireEvent('click.toolbar', ref, params);
            }
          }
        },
        items: [
          {
            region: 'west',
            width: 250,
            split: true,

            xtype: 'main-tree',
            rootVisible: false,
            store: 'djem.store.main.Tree',
            reference: 'tree'
          },
          {
            region: 'center',
            layout: 'fit',
            items: [
              { xtype: 'panel', layout: 'fit', hidden: true, reference: 'grid-view' },
              { xtype: 'main-grid', reference: 'grid' }
            ]
          }
        ]
      }]
    }
  ]
});
