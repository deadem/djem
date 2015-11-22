Ext.data.Connection.override({
    onComplete: function(request, xdrResult) {
        var me = this, options = request.options || {};
        try {
            //console.log('connection options:');
            //console.log(options);
            //debugger;
            if (request.xhr && request.xhr) {
                djem.app.fireEvent('token', request.xhr.getResponseHeader('x-csrf-token'));
            }
            if (request.xhr && request.xhr.status != 200 && Math.floor(request.xhr.status / 100) != 4) {
                if (!options.suppressErrors && (!options.proxy || !options.proxy.suppressErrors)) {
                    throw '';
                }
            }

            if (request.xhr && request.xhr.status != 200) {
                if (options.whisper !== true) {
                    if (!options.proxy || options.proxy.retry !== false) {
                        djem.app.on('authorized', function() {
                            me.request(options);
                        }, this, { single: true });
                    }
                    djem.app.fireEvent('authorize');
                }
                return false;
            }
        } catch (e) {
            Ext.MessageBox.show({
                title: 'Error', msg: request.xhr.response, buttons: Ext.MessageBox.OK, fn: function() {
                }
            });
        }
        this.callParent(arguments);
    }
});

Ext.define('djem.store.proxy', {
    extend:'Ext.data.proxy.Ajax',

    alias:'proxy.djem',
    url : 'api',

    buildRequest: function(operation) {
        SharedData.token && this.setExtraParam('_token', SharedData.token);
        return this.callParent(arguments);
    },

    reader: {
        type: 'json',
        rootProperty: 'items'
    }
});
