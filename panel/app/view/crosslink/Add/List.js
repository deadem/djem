Ext.define('djem.view.crosslink.Add.List',{
    extend: 'Ext.window.Window',
    alias: 'widget.crosslink.Add.List',

    requires: [
        'djem.view.crosslink.Add.ListController',
        'djem.view.crosslink.Add.ListModel'
    ],

    controller: 'crosslink-addlist',
    viewModel: {
        type: 'crosslink-addlist'
    },

    closable: true,
    autoShow: true,
    modal: true,
    bodyPadding: 10,
    title: 'CrossLink',
    width: '50%',
    height: '80%',
    layout: 'fit',

    html: 'Hello, World!',
/*
    items: [{
        xtype: 'crosslink.Browser',
        reference: 'browser',
        autoScroll: true
    }],
*/
    buttons: [
    '->' , {
        text: 'OK',
        handler: 'ok'
    }, {
        text: 'Cancel',
        handler: 'cancel'
    }]
});
