/* global Ext */
Ext.define('djem.store.Grid', {
    extend: 'Ext.data.Store',

    requires: [
        'djem.store.proxy'
    ],

    model: 'Ext.data.Model',
    autoLoad: false,

    pageSize: 300,
    remoteSort: true,

    proxy: {
        type: 'djem',
        url: 'api/content/load'
    }
});
