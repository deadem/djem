/* global Ext */
Ext.define('djem.widget.html', {
    extend: 'Ext.form.field.HtmlEditor',
    alias: [ 'djem.html', 'widget.html' ],

    config: {
        enableFont: false,
        enableFontSize: false,
        enableColors: false
    },
    plugins: [
    /*
        (function() {
            return new (Ext.extend(Ext.util.Observable, {
                init: function(cmp) {
                    this.cmp = cmp;
                    this.cmp.on('render', this.onRender, this);
                },
                onRender: function() {
                    this.cmp.getToolbar().add([{
                        //iconCls: 'x-edit-custom', //your iconCls here
                        handler: function(){
                            this.cmp.insertAtCursor('<hr>');
                        },
                        text: 'h',
                        scope: this,
                        tooltip: 'horizontal ruler',
                        overflowText: 'horizontal ruler'
                    }]);
                }
            }))();
        })()
    */
    ]
});
