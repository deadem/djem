/* global Ext*/
Ext.define('djem.view.main.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.main-tree',

    config: {
        header: false,
        hideHeaders: true,
        tools: [],
        cls: 'main-tree',
        singleExpand: true
    },

    listeners: {
        'cellclick' : function (table, td, i, record) {
            var me = this;
            me.selection.expand();
            return false;
        }
    },

    columns: [
        {
            renderer: function(value, data) {
                var row = '';

                data.record.set('second', data.record.getDepth() > 1);

                row += '<div class="{4}">';
                for (var i = 1; i < data.record.getDepth(); i++) {
                     row += '<div class="padding"></div>';
                }
                row += '<div class="icon {5}-{0}">{1}</div>';
                row += '<div class="title">';
                row += '<div class="name">{2}</div>';
                row += data.record.get('second') ? '' : '<div class="desc">{3}</div>';
                row += '</div>';
                row += '<div class="arrow">&#xF35D;</div>';
                row += '</div>';

                return Ext.String.format(row,
                    data.record.get('color') || 'gray',
                    data.record.get('icon') || '&#xE2C7;',
                    data.record.get('text'),
                    data.record.get('description'),
                    data.record.get('second') ? 'second' : 'first',
                    data.record.get('second') ? 'color' : 'bgcolor'
                );
            },
            flex: 1
        }
    ]
});
