/* global Ext*/
Ext.define('djem.view.main.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.main-tree',

  config: { header: false, hideHeaders: true, tools: [], cls: 'main-tree' },

  columns: [{
    flex: 1,
    renderer: function(value, data) {
      var row = '';
      row += '<div>';
      row += '<div class="icon bgcolor-{0}">{1}</div>';
      row += '<div class="title"><div class="name">{2}</div><div class="desc">{3}</div></div>';
      row += '</div>';

      return Ext.String.format(row, data.record.get('color') || 'gray', data.record.get('icon') || '&#xE2C7;',
                               data.record.get('text'), data.record.get('description'));
    }
  }]
});
