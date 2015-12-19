Ext.define('djem.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    init: function() {
        var me = this;
        djem.app.fireEvent('initSession', { 'whisper': true });
        me.lookupReference('login').setValue(SharedData.login);
        me.control({ 
            'textfield': {
                specialkey: function(field, e) {
                    if (e.getKey() == e.ENTER) {
                        field.up('form').query('button')[0].fireEvent('click');
                    }
                }
            }
        }); 
    },

    onLoginClick: function(_this) {
        var me = this;
        var login = me.lookupReference('login');
        var password = me.lookupReference('password');
        SharedData.login = login.getValue();

        (new Ext.create('Ext.data.Store', {
            fields: [ 'login', 'password' ],
            data: [{
                'login': login.getValue(),
                'password': password.getValue(),
                '_token': SharedData.token
            }],
            proxy: {
                type: 'djem',
                suppressErrors: true,
                retry: false
            },
            listeners: {
                endupdate: function() {
                    djem.app.fireEvent('authorized');
                }
            }
        })).sync();
        me.getView().destroy();
    }
});
