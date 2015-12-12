Ext.define('djem.view.main.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.app-main',

    requires: [
        'djem.view.main.MainController',
        'djem.view.main.Grid',
        'djem.view.main.Content',
        'djem.view.main.Toolbar',

        'djem.widget.html',
        'djem.widget.image',
        'djem.widget.tag',
        'djem.widget.text',
        'djem.widget.checkbox',
        'djem.widget.date',
        'djem.widget.time'
    ],

    controller: 'main',

    layout:'border',
    items: [{
        region: 'north',
        xtype: 'main-toolbar',
        reference: 'toolbar'
    }, {
        region: 'center',
        xtype: 'tabpanel',
        reference: 'tabs',
        items:[{
            title: 'Main',
            layout: 'border',
            reference: 'main',
            items: [{
                region: 'west',
                width: 250,
                split: true,

                xtype: 'treepanel',
                rootVisible: false,
                store: 'djem.store.main.Tree',
                reference: 'tree'
            }, {
                region: 'center',
                xtype: 'main-grid',
                reference: 'grid'
            }]
        }]
    }]
});
