// EXTJS-10221
// ComboBox does not lose focus if a textfield is clicked while dropdown is expanded
/* global Ext */
Ext.define('fix.Overrides.ViewBoundList', {
    override: 'Ext.view.BoundList',

    onHide: function() {
        this.callSuper(arguments);
    }
});
