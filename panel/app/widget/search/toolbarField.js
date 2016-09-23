/* global Ext */
Ext.define('djem.widget.searchToolbarField', {
    extend: 'djem.widget.text',
    alias: [ 'widget.searchToolbarField' ],

    config: {
        fieldLabel: null,
        hideLabel: true,
        width: 300,
        height: 30,
        cls: 'main-searchToolbarField'
    },
    emptyText: 'Найти',
    listeners: {
        afterrender: function() {
            var me = this;
            me.getEl().on('click', function() {
                me.focus();
            });
        }
    }
});
