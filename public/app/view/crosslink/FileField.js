Ext.define('djem.view.crosslink.FileField', {
    alias: 'widget.crosslink.FileField',
    extend: 'Ext.form.field.Hidden',

    getSubmitValue: function() {
        return Ext.decode(this.getRawValue(), 'data');
    },

    validate: function() {
        var me = this;
        var isValid = true;
        var data = me.getSubmitValue();
        Ext.each(data, function(v) {
            if (v['new'] !== undefined) {
                isValid = false;
                return false;
            }
        });
        return isValid;
    }
});
