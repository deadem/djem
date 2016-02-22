/* global Ext */
Ext.define('djem.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.main-grid',

    requires: [
        'djem.view.main.GridController',
        'djem.view.main.GridModel'
    ],

    controller: 'main-grid',
    viewModel: {
        type: 'main-grid'
    },

    listeners: {
        rowdblclick: 'rowdblclick',
        itemkeydown: 'itemkeydown',
        cellcontextmenu: 'cellcontextmenu'
    }
});
