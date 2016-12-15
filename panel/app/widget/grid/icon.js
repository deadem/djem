/* global Ext */
Ext.define('djem.widget.grid.icon', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.icon'],

    renderer: function (a, b, c) {
        return '<div style="background: url(' + a + ') no-repeat center center; background-size: cover; width: 50px; height: 70px;"></div>';
    }

});
