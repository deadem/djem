/* global Ext*/
Ext.define('djem.view.main.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.main-tree',


    config: {
        header: false,
        hideHeaders: true,
        tools: [],
        cls: 'main-tree'
    },


    columns: [
        {
            dataIndex: 'text',
            flex: 1,
            renderer: function(value, record) {
                console.log(record);
                return Ext.String.format('<div>{0}</div>', value);
            }
        }
    ]
});
