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
    title: 'Авторизация',
    closable: false,
    autoShow: true,
    modal: true,
    defaultFocus: 'textfield',

    items: {
        xtype: 'form',
        flex: 1,
        width: 440,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'djem.text',
                cls: 'medium-label',
                fieldLabel: 'Имя пользователя',
                reference: 'login',
                tabIndex: 1
            }, {
                xtype: 'djem.text',
                cls: 'medium-label',
                inputType: 'password',
                fieldLabel: 'Пароль',
                reference: 'password',
                tabIndex: 2
            }
        ],
        buttons: [
            {
                text: 'Войти',
                scale: 'medium',
                listeners: {
                    click: 'onLoginClick'
                }
            }
        ]
    }
});
