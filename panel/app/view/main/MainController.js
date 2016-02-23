/* global Ext, SharedData, djem */
Ext.define('djem.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'djem.view.login.Login',
        'djem.view.main.Content'
    ],

    init: function () {
        var me = this;

        function tabChange(newTab) {
            me.lookupReference('toolbar').fireEvent('change.toolbar', newTab, (newTab && newTab.getReference()) || 'main');
        }

        djem.app.on('update.toolbar', function (ref, data) {
            me.lookupReference('toolbar').fireEvent('update.toolbar', ref, data);
        }).on('click.toolbar', function (ref, params) {
            me.lookupReference('tabs').getActiveTab().fireEvent('click.toolbar', ref, params);
        }).on('show.toolbar', function (result) {
            me.lookupReference('tabs').getActiveTab().fireEvent('show.toolbar', result);
        }).on('change.toolbar', function () {
            tabChange(me.lookupReference('tabs').getActiveTab());
        });
        me.lookupReference('tabs').on('tabchange', function (_this, newTab) {
            tabChange(newTab);
        }).fireEvent('tabchange');

        me.lookupReference('tree').on('select', function (_this, record) {
            me.lookupReference('grid').fireEvent('load', record.data.id);
        }).on('load', function () {
            this.getRootNode().expand();
            if (this.getSelectionModel().getCount() === 0) {
                this.getSelectionModel().select(this.getRootNode().getChildAt(0));
            }
        });

        me.lookupReference('grid').on('openDocument', function (_this, data) {
            var tabs = me.lookupReference('tabs');
            var id = data.id || ++SharedData.nextDocumentNumber;
            var tabId = 'main-tab-' + String(data._doctype).replace(/[^0-9a-z]+/ig, '_') + '-' + (data.id || 'x-' + id);
            var tab = tabs.query('#' + tabId)[0];
            if (!tab) {
                var title = data.title || 'New document (' + id + ')';
                if (data.clone) {
                    title = '(Clone!) ' + title;
                }
                tab = tabs.add(Ext.create('widget.main-content', {
                    data: data,
                    title: title,
                    id: tabId,
                    reference: 'content',
                    closable: true
                }));
            }
            tabs.setActiveTab(tab);
        });

        // инициализируем авторизационный токен
        djem.app.fireEvent('initSession', {
            success: function () {
                me.lookupReference('tree').getStore().load();
            }
        });
    }
});
