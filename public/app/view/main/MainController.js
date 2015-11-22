Ext.define('djem.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'djem.view.login.Login',
        'djem.view.main.Content'
    ],

    init: function() {
        var me = this;

        Ext.widget('crosslink.Add.List', { title: 'test' });

        djem.app.on('update.toolbar', function(ref, data) {
            me.lookupReference('toolbar').fireEvent('update.toolbar', ref, data);
        }).on('click.toolbar', function(ref, params) {
            me.lookupReference('tabs').getActiveTab().fireEvent('click.toolbar', ref, params);
        });

        me.lookupReference('tabs').on('tabchange', function(_this, newTab, oldTab, options) {
            me.lookupReference('toolbar').fireEvent('change.toolbar', newTab, (newTab && newTab.getReference()) || 'main');
        }).fireEvent('tabchange');

        me.lookupReference('tree').on('select', function(_this, record, options) {
            me.lookupReference('grid').fireEvent('load', record.data.id);
        }).on('load', function() {
            this.getRootNode().expand();
            this.getSelectionModel().getCount() || this.getSelectionModel().select(this.getRootNode().getChildAt(0));
        });

        me.lookupReference('grid').on('openDocument', function(_this, data) {
            var tabs = me.lookupReference('tabs');
            var id = data.id || ++SharedData.nextDocumentNumber;
            var tabId = 'main-tab-' + data._model + '-' + (data.id || 'x-' + id);
            var tab = tabs.query('#' + tabId)[0];
            if (!tab) {
                tab = tabs.add(Ext.create('widget.main-content', {
                    data: data,
                    title: data.title || 'New document (' + id + ')',
                    id: tabId,
                    reference: 'content',
                    closable: true
                }));
            }
            tabs.setActiveTab(tab);
        });

        // инициализируем авторизационный токен
        djem.app.fireEvent('initSession', {
            success: function(response) {
                me.lookupReference('tree').getStore().load();
            }
        });
    }
});
