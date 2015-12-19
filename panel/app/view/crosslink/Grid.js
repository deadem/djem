Ext.define('djem.view.crosslink.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.crosslink.Grid',

    requires: [
        'djem.view.crosslink.ListController',
        'djem.view.crosslink.ListModel',
        'djem.store.CrossLink',
        'djem.model.Grid'
    ],
    
    controller: 'crosslink-grid',
    viewModel: {
        type: 'crosslink-grid'
    },

    columns: [
        { text: 'Name', dataIndex: 'name', sortable: false, hideable: false, flex: 1 }
    ],

    bindStore: function(data, initial, propertyName) {
        var me = this;
        if (data === null) {
            data = [];
        }
        if (data && typeof data == 'object' && !(data instanceof Ext.Base)) {
            if (me.single && !Array.isArray(data)) {
                data = [ data ];
            }
            if (Array.isArray(data)) {
                // если передали массив - создадим с ним новый стор
                var store = me.getStore() || Ext.create('djem.store.CrossLink', { model: 'djem.model.Grid' });
                store.removeAll();
                store.add(data);
                arguments[0] = store;
            }
        }
        this.callParent(arguments);
    }

});
