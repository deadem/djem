Ext.define('djem.view.login.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    id: 'login',
    cls: 'elevation-24',

    requires: [
        'djem.view.login.LoginController',
        'Ext.form.Panel'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    controller: 'login',
    bodyPadding: 10,
    title: 'Login',
    closable: false,
    autoShow: true,
    modal: true,
    defaultFocus: 'textfield',

    items: {
        xtype: 'form',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'djem.text',
                labelAlign: 'left',
                fieldLabel: 'Username',
                reference: 'login',
                tabIndex: 1
            }, {
                xtype: 'djem.text',
                labelAlign: 'left',
                inputType: 'password',
                fieldLabel: 'Password',
                reference: 'password',
                tabIndex: 2
            }, {
                xtype: 'label',
                hideEmptyLabel: false,
                value: 'Enter your credentials'
            }
        ],
        buttons: [
            {
                text: 'Login',
                listeners: {
                    click: 'onLoginClick'
                }
            }
        ]
    }
});
