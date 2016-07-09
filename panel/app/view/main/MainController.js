/* global Ext, SharedData, djem */
Ext.define('djem.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'djem.view.login.Login',
        'djem.view.main.Content'
    ],

    init: function() {
        var me = this,
            toolbar = me.lookupReference('toolbar'),
            tabs = me.lookupReference('tabs');

        function tabChange(newTab) {
            toolbar.fireEvent('change.toolbar', newTab, (newTab && newTab.getXType()) || 'panel');
        }

        djem.app.on('update.toolbar', function(ref, data) {
            toolbar.fireEvent('update.toolbar', ref, data);
        }).on('click.toolbar', function(ref, params) {
            tabs.getActiveTab().fireEvent('click.toolbar', ref, params);
        }).on('show.toolbar', function(result) {
            tabs.getActiveTab().fireEvent('show.toolbar', result);
        }).on('change.toolbar', function() {
            tabChange(tabs.getActiveTab());
        }).on('deleteDocument', function(_this, data) {
            Ext.MessageBox.confirm('Delete document', 'Delete ' + data.title + ' ?', function(button) {
                if (button == 'yes') {
                    Ext.create('djem.store.main.Content').action('delete').load({
                        callback: function() {
                        },
                        params: { _doctype: data._doctype, id: data.id }
                    });
                }
            });
        }).on('update.tab', function(_this, data) {
            var tabId = data.id;
            var tab = tabs.query('#' + tabId)[0];
            if (tab) {
                if (data.title) {
                    tab.setTitle(data.title);
                }
            }
        });
        tabs.on('tabchange', function(_this, newTab) {
            tabChange(newTab);
        }).fireEvent('tabchange');

        me.lookupReference('tree').on('select', function(_this, record) {
            me.lookupReference('grid').fireEvent('load', record.get('id'), record.get('color'));
        }).on('load', function() {
            this.getRootNode().expand();
            if (this.getSelectionModel().getCount() === 0) {
                this.getSelectionModel().select(this.getRootNode().getChildAt(0));
            }
        });

        me.lookupReference('grid').on('openDocument', function(_this, data) {
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
                    closable: true
                }));
                var field = tabs.items.findIndex('id', tab.getId());
                var item = tabs.getTabBar().items.get(field);
                if (item) {
                    item.addCls('tab-color-' + (data.color || 'blue'));
                }
                //var tabField = var activeTabIndex = tabPanel.items.findIndex('id', activeTab.id):
                //console.log(tab);
            }
            tabs.setActiveTab(tab);
        });

        // инициализируем авторизационный токен
        djem.app.fireEvent('initSession', {
            success: function() {
                me.lookupReference('tree').getStore().load();
            }
        });
    }
});
