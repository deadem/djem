Ext.define('djem.view.main.Content',{
    extend: 'Ext.form.Panel',
    alias: 'widget.main-content',

    requires: [
        'djem.view.main.ContentController',
        'djem.view.main.ContentModel',
        'djem.view.crosslink.Files'
    ],
    layout: 'fit',

    controller: 'main-content',
    viewModel: {
        type: 'main-content'
    },

    trackResetOnLoad: true,

    listeners: {
        dirtychange: 'onDirtyChange',
        'syncData': 'onSyncData',
        'validate': 'validate',
        'save': 'onSave'
    },

    bind: {},
    reference: 'content',
    bodyPadding: 10,
    autoScroll: true
});
