/* global Ext */
Ext.define('djem.widget.grid.image', {
  extend: 'Ext.grid.column.Column',
  alias: ['widget.djem.grid.image'],

  renderer: function(value) {
    return Ext.String.format('<div class="image" style="background-image: url({0})"></div>', value);
  }
});
