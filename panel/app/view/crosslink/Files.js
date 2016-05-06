Ext.define('djem.view.crosslink.Files',{
    extend: 'Ext.view.View',
    alias: 'widget.crosslink.Files',

    cls: 'x-form-crosslink-files-wrap',
    requires: [
        'djem.view.crosslink.FilesController',
        'djem.view.crosslink.FilesModel',
        'djem.view.crosslink.FileField',
        'djem.store.CrossLink',
        'djem.model.Files',
        'djem.view.crosslink.Editor'
    ],

    listeners: {
        afterrender: { fn: 'initAfterRender', options: { single: true } },
        destroy: 'onDestroy',
        beforedestroy: 'onBeforeDestroy',
        itemdblclick: 'onItemDblClick',
        mousemove: { fn: 'onMouseMove', element: 'el' }
    },

    controller: 'crosslink-files',
    viewModel: {
        type: 'crosslink-files'
    },
    deferEmptyText: false,

    bindStore: function(data, initial, propertyName) {
        var me = this;
        if (data === null) {
            data = [];
        }
        if (data && (typeof data == 'object' || typeof data == 'string') && !(data instanceof Ext.Base)) {
            if (me.single) {
                if (typeof data == 'string') {
                    data = [ { 'url': data } ];
                } else if (!Array.isArray(data)) {
                    data = [ data ];
                }
            }

            if (Array.isArray(data)) {
                // если передали массив - создадим с ним новый стор
                var store = me.getStore() || Ext.create('djem.store.CrossLink', { model: 'djem.model.Files' });
                store.removeAll();
                store.add(data);
                arguments[0] = store;

                Ext.defer(function() {
                    me.fireEvent('initValue');
                }, 1);
            }
        }
        this.callParent(arguments);
    },

    overItemCls: 'x-grid-item-over',
    itemSelector: 'div.thumb-wrap',
    tpl: [
        '<tpl for=".">',
            '<div class="thumb-wrap {new}"><a href="#" class="trash">&#xf00d;</a>',
                '<div class="thumb" style="background-image: url({url})"/>',
                '<span>{name}</span>',
            '</div>',
        '</tpl>'
    ]
});
