/* global Ext */
Ext.define('Ext.theme.djem.grid.Panel', {
    override: 'Ext.grid.Panel',

    onRender: function() {
        this.on('afterrender', function() {
            var me = this,
                target = me.getView().getTargetEl(),
                header = me.getEl().down('.x-grid-header-ct');

            // добавляем тень при прокрутке
            target.on('scroll', function(e, t) {
                if (t.scrollTop) {
                    header.addCls('elevation-2').setStyle('z-index', 2);
                } else {
                    header.removeCls('elevation-2').setStyle('z-index', null);
                }
            });
        });

        return this.callParent(arguments);
    }
});
