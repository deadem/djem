/* global Ext */
Ext.define('djem.store.main.Tree', {
  extend: 'Ext.data.TreeStore',

  requires: ['djem.store.proxy'],

  autoLoad: false,

  root: { id: 0 },

  proxy: { type: 'djem', url: 'api/tree' }
});
