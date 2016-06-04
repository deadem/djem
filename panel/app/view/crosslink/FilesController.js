/* global Ext */
Ext.define('djem.view.crosslink.FilesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crosslink-files',

    config: {
        image: null,
        imageZoom: 1,
        imageMoveOffset: { x: 0, y: 0 }
    },

    uploader: Ext.create('djem.store.FileUpload'),

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
            if (!exists) {
                this._innerState.records.push(newRecord);
            }
        },
        getRecords: function() { return this._innerState.records; },
        isDrag: function() { return !!this._innerState.count; },
        inc: function() { return ++this._innerState.count; },
        dec: function() { return (this._innerState.count = Math.max(0, this._innerState.count - 1)); },
        reset: function() {
            this.setExisting(false);
            this._innerState.records = [];
            this._innerState.count = 0;
        }
    },

    onDestroy: function() {
        var me = this;
        me.uploader.destroy();
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
                if (me.field) {
                    me.field.fireEvent('dataReady');
                }
                return;
            }
            me.uploader.upload(filePacks[i].records, function(successData) {
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
                file = me.uploader.lock(file);
                var record = {
                    url: file.url,
                    file: file.file,
                    name: file.name,
                    height: 64,
                    'new': 'new',
                    offset: []
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
        if (me.getView().single) {
            me.getView().addCls('x-form-crosslink-files-single');
        }
        me.getView().emptyText = '<input style="margin:5%;" type="file" ' +
            (me.getView().single ? '' : ' multiple="" ') +
            ' onchange="Ext.get(this.parentNode).fireEvent(\'filechange\', event, this);">';
    },

    onBeforeDestroy: function() {
        var me = this;
        me.processDropZone(true);
    },

    setDirty: function(isDirty) {
        var me = this;
        function cleanup(data, idProperty, fields) {
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; ++i) {
                    cleanup(data[i], idProperty, fields);
                }
            } else if (data && typeof data == 'object') {
                delete data[idProperty];
                for (var key in data) {
                    if (!Ext.Array.contains(fields, key)) {
                        delete data[key];
                    }
                }
            }
        }
        if (me.field) {
            if (isDirty) {
                var model = me.getView().getStore().getModel();
                var idProperty = model.idProperty;
                var data = Ext.pluck(me.getView().getStore().data.items, 'data');
                cleanup(data, idProperty, Ext.pluck(model.getFields(), 'name'));
                me.field.setValue(Ext.encode(data));
                // me.field.setValue(me.field.getValue() - 1);
            } else {
                me.field.resetOriginalValue();
            }
        }
        // me.field.setValue(Ext.pluck(me.getView().getStore().data.items, 'data'));
    },

    initAfterRender: function() {
        var me = this,
            view = me.getView(),
            el = view.getEl();

        me.processDropZone(false);

        var form = view.up('form');
        if (form) {
            view.on('initValue', function() {
                me.setDirty(true);
                me.field.resetOriginalValue();
            });

            var field = Ext.create('djem.view.crosslink.FileField', { name: view.name });
            me.field = form.add(field);
            me.field.on('dataReady', function() {
                form.getForm().fireEvent('dataReady');
            });
            me.field.on('change', function(_this, value) {
                if (view.single) {
                    value = Ext.decode(value);
                    var url = value && value[0] && value[0].url;

                    if (me.isNewImage(url)) {
                        me.setImage(url);
                    }
                }
            });
            form.getForm().on('syncFields', function() {
                if (!me.field.validate()) {
                    // если не загружали файл на сервер - загрузим
                    me.uploadFiles();
                }
            });
        }
        el.on('filechange', function(e, target) {
            if (target) {
                me.dropFiles({ dataTransfer: target });
            }
            e.preventDefault();
            e.stopPropagation();
        });
        el.on('click', function(e) {
            if (Ext.get(e.target).hasCls('trash')) {
                var dom = Ext.get(e.target).up('.thumb-wrap'),
                    record = dom && view.getRecord(dom);

                window.URL.revokeObjectURL(record.data.url);
                view.getStore().remove(record);
                view.un('mousemove', 'onMouseMove', me);

                me.setDirty(true);
                e.stopEvent();
            }
        });
        if (view.single) {
            el.on('mousedown', function(evt) {
                if (view.getStore().getCount() == 1) {
                    var body = Ext.get(document.body),
                        iframe = Ext.select('iframe'),
                        rec = view.getStore().getAt(0),
                        offset = rec.get('offset') || { x: 0, y: 0 };
                    body.addCls('x-unselectable');
                    iframe.setStyle('pointer-events', 'none');

                    me.setImageMoveOffset({ x: evt.event.screenX + offset.x, y: evt.event.screenY + offset.y });

                    var mousemove = function(evt) {
                        return me.onMouseMove(evt);
                    };
                    var detach = function() {
                        body.removeCls('x-unselectable');
                        iframe.setStyle('pointer-events', null);
                        window.removeEventListener('mouseup', detach, true);
                        window.removeEventListener('mousemove', mousemove, true);
                    };
                    window.addEventListener('mousemove', mousemove, true);
                    window.addEventListener('mouseup', detach, true);
                }
            });
        }
    },

    processDropZone: function(remove) {
        var me = this;
        Ext.each([ 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ], function(type) {
            Ext.getBody().dom[remove === true ? 'removeEventListener' : 'addEventListener'](type, me.showDropZoneHandler);
        });
        var view = me.getView().getEl();
        Ext.each([ 'dragstart', 'drag' ], function(type) {
            if (view) {
                view.dom[remove === true ? 'removeEventListener' : 'addEventListener'](type, me.startDragHandler);
            }
        });
        if (view) {
            view.dom[remove === true ? 'removeEventListener' : 'addEventListener']('drop', me.dropFilesHandler);
        }
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
    },

    // редактор
    onItemDblClick: function(element, record) {
        var me = this;
        var view = element.up('main-content');
        var widget = Ext.widget('crosslink.Editor', { title: (record.data && record.data.name) || 'Editor', data: view.config.data });
        widget.add(element.editor);
        widget.getViewModel().setData(record.data);
        widget.on('update', function() {
            record.set(widget.getViewModel().getData());
            record.commit();
            me.setDirty(true);
        }, this, { single: true });
    },

    // картинка
    isNewImage: function(href) {
        var prevImage = this.getImage();
        if (!prevImage || prevImage['data-href'] !== href) {
            return true;
        }
        return false;
    },

    applyImage: function(href) {
        var me = this,
            view = me.getView(),
            image = new Image();

        if (!href) {
            return;
        }

        var prevImage = me.getImage();
        if (prevImage) {
            prevImage.onload = null;
        }

        image['data-href'] = href;

        me.setImageZoom(1);
        view.setStyle('cursor', 'wait');

        image.onload = function() {
            view.setStyle('cursor', 'default');
            if (image.width - view.getWidth() > 0 && image.height - view.getHeight() > 0) {
                me.setImageZoom(Math.max(view.getHeight() / image.height, view.getWidth() / image.width));
            }

            me.moveSingleImage({ x: 0, y: 0 });
        };

        if (href) {
            image.src = href;
        }

        return image;
    },

    moveSingleImage: function(offset) {
        var me = this,
            image = me.getImage(),
            store = me.getView().getStore(),
            zoom = me.getImageZoom(),
            width = image.width * zoom,
            height = image.height * zoom;

        if (store.getCount() == 1) {
            var rec = store.getAt(0);
            rec.set({
                offset: offset,
                width: width,
                height: height,
                calcOffset: -offset.x + 'px ' + -offset.y + 'px',
                calcZoom: width + 'px ' + height + 'px'
            });
            me.setDirty(true);
        }
    },

    onMouseMove: function(evt) {
        var me = this;
        var image = me.getImage(),
            zoom = me.getImageZoom(),
            el = me.getView().getEl(),
            startOffset = me.getImageMoveOffset({ x: evt.screenX, y: evt.screenY }),
            offset = {};

        offset.x = -Math.min(0, Math.max(el.getWidth() - image.width * zoom, evt.screenX - startOffset.x));
        offset.y = -Math.min(0, Math.max(el.getHeight() - image.height * zoom, evt.screenY - startOffset.y));

        me.moveSingleImage(offset);
    }
});
