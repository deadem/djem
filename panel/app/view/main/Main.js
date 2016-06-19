/* global Ext*/
Ext.define('djem.view.main.Main', {
    extend: 'Ext.container.Container',
    alias: 'widget.app-main',

    requires: [
        'djem.view.main.MainController',
        'djem.view.main.Grid',
        'djem.view.main.Content',
        'djem.view.main.Toolbar',

        'widget.image',

        'djem.widget.html',
        'djem.widget.image',
        'djem.widget.images',
        'djem.widget.tag',
        'djem.widget.text',
        'djem.widget.checkbox',
        'djem.widget.combobox',
        'djem.widget.date',
        'djem.widget.time'
    ],

    controller: 'main',

    layout: 'border',
    items: [ {
        region: 'north',
        xtype: 'main-toolbar',
        cls: 'top-toolbar',
        reference: 'toolbar'
    }, {
        region: 'center',
        xtype: 'tabpanel',
        cls: 'top-toolbar',
        reference: 'tabs',
        items: [ {
            title: 'Main',
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
            items: [ {
                region: 'west',
                width: 250,
                split: true,

                xtype: 'treepanel',
                rootVisible: false,
                store: 'djem.store.main.Tree',
                reference: 'tree'
            }, {
                region: 'center',
                layout: 'fit',
                items: [ {
                    xtype: 'panel',
                    layout: 'fit',
                    hidden: true,
                    reference: 'grid-view'
                }, {
                    xtype: 'main-grid',
                    reference: 'grid'
                } ]
            } ]
        } ]
    } ]
});
