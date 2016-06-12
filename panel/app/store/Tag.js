/* global Ext */
Ext.define('djem.store.Tag', {
    extend: 'Ext.data.Store',

    requires: [
        'djem.store.proxy'
    ],

    model: 'djem.model.Tag',
    autoLoad: false,

    proxy: {
        type: 'djem',
        url: 'api/content/load'
    }
});
