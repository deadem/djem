/* global Ext */
Ext.define('djem.widget.gridImage', {
    extend: 'Ext.grid.column.Column',

    renderer: function (value) {
        return Ext.String.format(['<div class="image" style="background-image: url({0})"></div>'], value);
    }

});
