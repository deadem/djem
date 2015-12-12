Ext.define('djem.view.crosslink.FilesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crosslink-files',

    lockedUrls: [],
    field: undefined,
    dragState: {
        _innerState: {},
        setExisting: function(existing) { this._innerState.existing = !!existing; },
        isExisting: function() { return !!this._innerState.existing; },
        addRecord: function(newRecord) {
            var exists = false;
            Ext.each(this._innerState.records, function(record) {
                if (newRecord.id == record.id) {
                    exists = true;
                    return false;
                }
            });
            if (exists == false) {
                this._innerState.records.push(newRecord);
            }
        },
        getRecords: function() { return this._innerState.records; },
        isDrag: function() { return !!this._innerState.count; },
        inc: function() { return ++this._innerState.count; },
        dec: function() { return this._innerState.count = Math.max(0, this._innerState.count - 1); },
        reset: function() {
            this.setExisting(false);
            this._innerState.records = [];
            this._innerState.count = 0;
        }
    },

    onDestroy: function() {
        var me = this;
        Ext.each(me.lockedUrls, function(obj) {
            window.URL.revokeObjectURL(obj);
        });
    },

    startDrag: function(e) {
        var me = this;
        me.dragState.setExisting(true);
        var dom = Ext.get(e.target).up('.thumb-wrap');
        var record = dom && me.getView().getRecord(dom);
        if (record) {
            me.dragState.addRecord(record);
        } else {
            me.dragState.reset();
            e.preventDefault();
            e.stopPropagation();
        }
    },

    upload: function(records, callback) {
        var me = this;
        if (records.length == 0) {
            callback([]);
            return;
        }
        var url = 'api/files/upload';
        var xhr = new XMLHttpRequest();
        var form = new FormData();

        xhr.open('POST', url, true);
        xhr.onreadystatechange = function() {
            var data = false;
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try {
                        djem.app.fireEvent('token', xhr.getResponseHeader('x-csrf-token'));
                        data = JSON.parse(xhr.responseText);
                        callback(data);
                        return;
                    } catch(ex) {
                    }
                }
                if (xhr.status == 500) {
                    Ext.MessageBox.show({ title: 'Error', msg: xhr.response });
                } else if (xhr.status != 200) {
                    // если произошла ошибка - проверим авторизацию
                    djem.app.fireEvent('initSession', {
                        success: function() {
                            me.upload(records, callback);
                        }
                    });
                    return;
                }
                callback(false);
            }
        };
        form.append('_token', SharedData.token);
        Ext.each(records, function(record) {
            form.append('data[]', record.get('file'));
        });
        xhr.send(form);
    },

    uploadFiles: function() {
        var maxRequestSize = 0; // 0 - каждый файл заливаем отдельно
        var me = this;

        var filePacks = [];
        var pack = { size: 0, records: [] };
        Ext.each(me.getView().getStore().getNewRecords(), function(record) {
            var file = record.get('file');
            if (file && record.get('new') !== undefined) {
                record.set('new', 'new upload');
                pack.size += file.size;
                pack.records.push(record);
                if (pack.size > maxRequestSize) {
                    filePacks.push(pack);
                    pack = { size: 0, records: [] };
                }
            }
        });
        filePacks.push(pack);

        function uploadNext(i) {
            if (!filePacks[i]) {
                me.setDirty(true);
                me.field && me.field.fireEvent('dataReady');
                return;
            }
            me.upload(filePacks[i].records, function(successData) {
                if (successData) {
                    Ext.each(filePacks[i].records, function(record, index) {
                        var data = successData[index];
                        record.set({
                            'new': undefined,
                            'file': data.file,
                            'name': data.name
                        });
                    });
                    uploadNext(i + 1);
                }
            });
        }
        uploadNext(0);
    },

    dropFiles: function(e) {
        var me = this;
        if (!me.dragState.isExisting()) {
            var items = [];
            Ext.each(e.dataTransfer.files, function(file) {
                var url = window.URL.createObjectURL(file);
                me.lockedUrls.push(url);
                var record = {
                    url: url,
                    file: file,
                    name: file.name,
                    height: 64,
                    'new': 'new'
                };
                items.push(record);
            });
            if (me.getView().single) {
                me.getView().getStore().removeAll();
                items = items.slice(0, 1);
            }
            me.getView().getStore().add(items);
        }
        me.dragState.reset();
        me.setDirty(true);
    },

    showDropZone: function(e) {
        var me = this;
        if (e.type == 'dragenter') { me.dragState.inc(); }
        if (e.type == 'dragleave') { me.dragState.dec(); }
        if (e.type == 'drop') {
            me.dragState.dec();
        }

        me.getView()[ me.dragState.isDrag() && !me.dragState.isExisting() ? 'addCls' : 'removeCls']('drop-target');
        Ext.getBody()[ e.target == document.body ? 'addCls' : 'removeCls']('hover');

        if (e.type == 'dragend' || e.type == 'drop') {
            me.dragState.reset();
            e.preventDefault();
            e.stopPropagation();
        }
    },

    init: function() {
        var me = this;
        me.startDragHandler = { handleEvent: function(evt) { return me.startDrag(evt); } };
        me.showDropZoneHandler = { handleEvent: function(evt) { return me.showDropZone(evt); } };
        me.dropFilesHandler = { handleEvent: function(evt) { return me.dropFiles(evt); } };
        me.dragState = Ext.Object.merge({}, me.dragState);
        me.dragState.reset();
        me.lockedUrls = [];
        if (me.getView().single) {
            me.getView().addCls('x-form-crosslink-files-single');
        }
        me.getView().emptyText = '<input style="margin:5%;" type="file" ' +
            (me.getView().single ? '' : ' multiple="" ') +
            ' onchange="Ext.get(this.parentNode).fireEvent(\'filechange\', this);">';
    },

    onBeforeDestroy: function() {
        var me = this;
        me.processDropZone(true);
    },

    setDirty: function(isDirty) {
        var me = this;
        function cleanup(data) {
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; ++i) {
                    cleanup(data[i]);
                }
            }
            data && typeof data == 'object' && delete data['id'];
        }
        if (me.field) {
            if (isDirty) {
                var data = Ext.pluck(me.getView().getStore().data.items, 'data');
                cleanup(data);
                me.field.setValue(Ext.encode(data));
                //me.field.setValue(me.field.getValue() - 1);
            } else {
                me.field.resetOriginalValue();
            }
        }
        //me.field.setValue(Ext.pluck(me.getView().getStore().data.items, 'data'));
    },

    initAfterRender: function(cmp) {
        var me = this;
        me.processDropZone(false);
        var form = me.getView().up('form');
        me.getView().on('initValue', function() {
            me.setDirty(true);
            me.field.resetOriginalValue();
        });
        if (form) {
            var field = Ext.create('djem.view.crosslink.FileField', { name: me.getView().name });
            me.field = form.add(field);
            me.field.on('dataReady', function() {
                form.getForm().fireEvent('dataReady');
            });
            form.getForm().on('syncFields', function() {
                if (!me.field.validate()) {
                    // если не загружали файл на сервер - загрузим
                    me.uploadFiles();
                }
            });
        }
        me.getView().getEl().on('filechange', function(target) {
            if (target) {
                me.dropFiles({ dataTransfer: target });
            }
            event.preventDefault();
            event.stopPropagation();
        });
        me.getView().getEl().on('click', function(e) {
            if (Ext.get(e.target).hasCls('trash')) {
                var dom = Ext.get(e.target).up('.thumb-wrap');
                var record = dom && me.getView().getRecord(dom);
                window.URL.revokeObjectURL(record.data.url);
                me.getView().getStore().remove(record);
                me.setDirty(true);
                e.preventDefault();
                e.stopPropagation();
            }
        });
    },

    processDropZone: function(remove) {
        var me = this;
        Ext.each(['dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'], function(type) {
            Ext.getBody().dom[remove === true ? 'removeEventListener' : 'addEventListener'](type, me.showDropZoneHandler);
        });
        Ext.each([ 'dragstart', 'drag' ], function(type) {
            me.getView().getEl().dom[remove === true ? 'removeEventListener' : 'addEventListener'](type, me.startDragHandler);
        });
        me.getView().getEl().dom[remove === true ? 'removeEventListener' : 'addEventListener']('drop', me.dropFilesHandler);
    },

    initViewModel: function() {
        var me = this;
        me.getView().setStore(Ext.create('djem.store.CrossLink', { model: 'djem.model.Files' }));
        me.dragState.reset();

        if (me.getView().height === undefined) {
            me.getView().addCls('height-scale');
        }
        if (me.getView().width === undefined) {
            me.getView().addCls('width-scale');
        }
    }
});
