Ext.define('djem.store.CrossLink', {
    extend: 'Ext.data.Store',

    requires: [
        'djem.store.proxy'
    ],

    autoLoad: false,

    proxy: {
        type: 'djem',
        url : 'api/files'
    }
});
