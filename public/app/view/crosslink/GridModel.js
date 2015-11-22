Ext.define('djem.view.crosslink.GridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.crosslink-grid',

    formulas: {
        initialization: function(get) {
            var me = this;
            var store = String(me.getParent().getView().config.bind).replace(/\s*\{|\}\s*/g, '');
            me.getView().bindStore(me.get(store));
        }
    }
});
