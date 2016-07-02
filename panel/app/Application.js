/* global Ext, SharedData */
Ext.define('SharedData', {
    singleton: true,
    nextDocumentNumber: 0
});

Ext.define('djem.Application', {
    extend: 'Ext.app.Application',
    name: 'djem',

    stores: [
        'djem.store.main.Tree'
    ],

    listeners: {
        initSession: function(options) {
            options = options || {};
            options.url = 'api';
            options.suppressErrors = true;
            Ext.Ajax.request(options);
        },
        authorize: function() {
            var login = Ext.get('login');
            if (login) {
                login.component.fireEvent('reinit');
            } else {
                Ext.widget('login');
            }
        },
        token: function(token) {
            if (token) {
                SharedData.token = token;
            }
        }
    },

    launch: function() {
        function cancel(e) { e.preventDefault().stopPropagation(); }
        Ext.getBody().on({
            dragenter: cancel,
            dragover: cancel,
            drop: cancel
        });
    }
});
