Ext.define('djem.view.crosslink.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.crosslink.List',

    requires: [
        'djem.view.crosslink.ListController',
        'djem.view.crosslink.ListModel',
        'djem.view.crosslink.Grid',
        'djem.view.crosslink.Add.List'
    ],

    controller: 'crosslink-list',
    viewModel: {
        type: 'crosslink-list'
    },

    header: false,

    items: [
        { xtype: 'crosslink.Grid', flex: 1 }
    ],

    buttons: [
    '->' , {
        text: 'Add',
        handler: 'add'
    }, {
        text: 'Remove',
        handler: 'remove'
    }]

});
