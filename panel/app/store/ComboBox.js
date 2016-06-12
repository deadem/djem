/* global Ext */
Ext.define('djem.store.ComboBox', {
    extend: 'Ext.data.Store',

    requires: [
        'djem.store.proxy'
    ],

    model: 'djem.model.ComboBox',
    autoLoad: true,

    proxy: {
        type: 'djem',
        url: 'api/content/load'
    }
});
