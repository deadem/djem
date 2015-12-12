Ext.define('djem.store.main.ContentLoader', {
    extend: 'Ext.data.Store',
    alias: 'store.content',

    requires: [
        'djem.store.proxy',
        'djem.model.Content'
    ],

    model: 'djem.model.Content',
    autoLoad: false,

    pageSize: 100,
    remoteSort: true,

    proxy: {
        type: 'djem',
        url : 'api/content/load'
    }
});
