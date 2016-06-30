// EXTJS-10221
// ComboBox does not lose focus if a textfield is clicked while dropdown is expanded
/* global Ext */
Ext.define('fix.overrides.ViewBoundList', {
    override: 'Ext.view.BoundList',

    onHide: function() {
        this.callParent(arguments);
    }
});
