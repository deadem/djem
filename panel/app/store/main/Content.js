Ext.define('djem.store.main.Content', {
    extend: 'Ext.data.Store',
    alias: 'store.main-content',

    requires: [
        'djem.store.proxy',
        'djem.model.Content'
    ],

    model: 'djem.model.Content',
    autoLoad: false,

    action: function (action) {
        this.getProxy().setUrl('api/content' + '/' + action);
        return this;
    },

    proxy: {
        type: 'djem',
        url : 'api/content'
    }
});
