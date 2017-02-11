/* global Ext, djem, SharedData*/
Ext.data.request.Ajax.override({
  onComplete: function() {
    var me = this, options = me.options || {};
    try {
      if (me.xhr && me.xhr) {
        djem.app.fireEvent('token', me.xhr.getResponseHeader('x-csrf-token'));
      }
      if (me.xhr && me.xhr.status != 200 && (Math.floor(me.xhr.status / 100) != 4 || me.xhr.status == 400)) {
        if (!options.suppressErrors && (!options.proxy || !options.proxy.suppressErrors)) {
          throw new Error();
        }
      }

      if (me.xhr && me.xhr.status == 401) {
        if (options.whisper !== true) {
          if (!options.proxy || options.proxy.retry !== false) {
            djem.app.on('authorized', function() {
              if (SharedData.token && typeof options == 'object' && typeof options.params == 'object') {
                options.params._token = SharedData.token;
              }
              me.start(options);
            }, this, { single: true });
          }
          djem.app.fireEvent('authorize');
        }
        return false;
      }
    } catch (e) {
      Ext.MessageBox.show({
        title: 'Error',
        closable: false,
        msg: (e && e.message || '') + me.xhr.response,
        buttons: Ext.MessageBox.OK,
        fn: function() {}
      });
    }
    return this.callParent(arguments);
  }
});

Ext.define('djem.store.proxy', {
  extend: 'Ext.data.proxy.Ajax',

  alias: 'proxy.djem',
  url: 'api',

  buildRequest: function() {
    if (SharedData.token) {
      this.setExtraParam('_token', SharedData.token);
    }
    return this.callParent(arguments);
  },

  reader: { type: 'json', rootProperty: 'items' }
});
