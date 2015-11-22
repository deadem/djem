Ext.define('djem.view.crosslink.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crosslink-list',

    add: function(_this) {
        var me = this;
        Ext.widget('crosslink.Add.List');
    },

    remove: function(_this) {
        var me = this;
    }
});
