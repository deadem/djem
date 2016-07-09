/* global Ext */
Ext.define('djem.widget.searchToolbarField', {
    extend: 'Ext.form.field.Text',
    alias: [ 'widget.searchToolbarField' ],

    config: {
        fieldLabel: null,
        hideLabel: true,
        width: 300,
        height: 30,
        cls: 'main-searchToolbarField'
    },
/*
,
        {
            glyph: 'xE8B6@Icons',
            scale: 'medium',
            reference: 'searchIcon'
        }
*/
    listeners: {
    }
});
