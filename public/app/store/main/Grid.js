Ext.define('djem.store.main.Grid', {
    extend: 'Ext.data.Store',

    requires: [
        'djem.store.proxy'
    ],

    model: 'Ext.data.Model',
    autoLoad: false,

    proxy: {
        type: 'djem',
        url : 'api/grid'
    }
});
