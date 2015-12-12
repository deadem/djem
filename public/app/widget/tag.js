Ext.define('djem.widget.tag', {
    extend: 'Ext.form.field.Tag',
    alias: [ 'djem.tag', 'widget.tag' ],

    filterPickList: true,

    listeners: {
        'change': function() {
            this.completeEdit();
        }
    }

});
