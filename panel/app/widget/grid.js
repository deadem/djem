/* global Ext */
Ext.define('djem.widget.grid', {
    extend: 'Ext.grid.Panel',
    alias: [ 'widget.djem.grid' ],

    requires: [
        'djem.widget.grid.Controller'
    ],

    controller: 'djem.grid',

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorganize'
        },

        listeners: {
            beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
                var me = this,
                    position = dropPosition == 'before' ? 'before' : 'after';

                Ext.each(data.records, function(record) {
                    record.set('sort', (+overModel.get('sort') || 0));
                });

                dropHandlers.wait = true;
                var mask = new Ext.LoadMask({
                    target: me
                });
                mask.show();

                var store = me.getStore();
                store.sync({
                    params: {
                        change: 'sort',
                        position: position
                    },
                    callback: function() {
                        mask.destroy();
                        dropHandlers.processDrop();
                    }
                });
            },
            drop: function() {
                var me = this,
                    store = me.getStore();

                store.load();
            }
        }
    }
});
