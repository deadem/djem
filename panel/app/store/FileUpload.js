/* global Ext, djem, JSON, SharedData */
Ext.define('djem.store.FileUpload', {
    lockedUrls: [],

    lock: function (file) {
        var me = this;
        var url = window.URL.createObjectURL(file);
        me.lockedUrls.push(url);

        var record = {
            url: url,
            file: file,
            name: file.name
        };
        record.get = function (name) {
            return record[name];
        };
        return record;
    },

    upload: function (records, callback) {
        var me = this;
        callback = callback || function () {};
        if (!records.length) {
            callback([]);
            return;
        }

        var url = 'api/files/upload';
        var xhr = new XMLHttpRequest();
        var form = new FormData();

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function () {
            var data = false;
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try {
                        djem.app.fireEvent('token', xhr.getResponseHeader('x-csrf-token'));
                        data = JSON.parse(xhr.responseText);
                        callback(data);
                        return;
                    } catch (ex) {
                    }
                }
                if (xhr.status == 500) {
                    Ext.MessageBox.show({ title: 'Error', msg: xhr.response });
                } else if (xhr.status == 413) {
                    Ext.each(records, function (record) {
                        record.set('new', 'new error');
                    });
                    Ext.MessageBox.show({ title: 'File too big', msg: xhr.response });
                } else if (xhr.status != 200) {
                    // если произошла ошибка - проверим авторизацию
                    djem.app.fireEvent('initSession', {
                        success: function () {
                            me.upload(records, callback);
                        }
                    });
                    return;
                }
                callback(false);
            }
        };
        form.append('_token', SharedData.token);
        Ext.each(records, function (record) {
            form.append('data[]', record.get('file'));
        });
        xhr.send(form);
    },

    destroy: function () {
        var me = this;
        me.callParent(arguments);
        Ext.each(me.lockedUrls, function (obj) {
            window.URL.revokeObjectURL(obj);
        });
    }
});
