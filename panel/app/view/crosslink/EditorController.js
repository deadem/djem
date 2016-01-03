Ext.define('djem.view.crosslink.EditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crosslink-editor',


    ok: function () {
    },

    cancel: function () {
        this.getView().destroy();
    }
});
