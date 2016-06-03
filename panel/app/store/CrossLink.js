Ext.define('djem.store.CrossLink', {
    extend: 'Ext.data.Store',

    requires: [
        'djem.store.proxy'
    ],

    model: 'djem.model.Files',
    autoLoad: false,

    proxy: {
        type: 'djem',
        url : 'api/files'
    }
});
