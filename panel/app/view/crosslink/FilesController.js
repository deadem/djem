/* global Ext */
Ext.define('djem.view.crosslink.FilesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.crosslink-files',

    config: {
        image: null,
        imageControlValue: 'background-position',
        imageControlUnits: 'px'
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

    // single image only
    applyImage: function(href) {
        var me = this,
            image = new Image();

        image.onload = function() {
            me.getView().on({
                mousemove: { fn: 'onMouseMove', element: 'el' },
                scope: me
            });
        };
        image.src = href;

        return image;
    },

    getImageControlValue: function(el) {
        return (el.getStyleValue(this.imageControlValue) || '0 0').match(/\d+|-\d+/g);
    },

    setImageControlValue: function(el, pos) {
        if (Ext.isObject(el)) {
            console.log("pos:" + pos);
            el.setStyle(this.imageControlValue, pos);
        } else {
            this.imageControlValue = el;
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
                me.setImage(items[0].url);
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
        function cleanup(data, idProperty) {
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; ++i) {
                    cleanup(data[i], idProperty);
                }
            }
            if (data && typeof data == 'object') {
                delete data[idProperty];
            }
        }
        if (me.field) {
            if (isDirty) {
                var idProperty = me.getView().getStore().getModel().idProperty;
                var data = Ext.pluck(me.getView().getStore().data.items, 'data');
                cleanup(data, idProperty);
                me.field.setValue(Ext.encode(data));
                // me.field.setValue(me.field.getValue() - 1);
            } else {
                me.field.resetOriginalValue();
            }
        }
        // me.field.setValue(Ext.pluck(me.getView().getStore().data.items, 'data'));
    },

    initAfterRender: function() {
        var me = this;
        me.processDropZone(false);
        var form = me.getView().up('form');
        if (form) {
            me.getView().on('initValue', function() {
                me.setDirty(true);
                me.field.resetOriginalValue();
            });

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
        me.getView().getEl().on('filechange', function(e, target) {
            if (target) {
                me.dropFiles({ dataTransfer: target });
            }
            // e.stopEvent();
            e.preventDefault();
            e.stopPropagation();
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
    isLeftMouseBtnPressed: function(evt) {
        if ('buttons' in evt) {
            return evt.buttons == 1;
        }
        var button = evt.which || evt.button;
        return button == 1;
    },

    onMouseMove: function(evt, element) {
        var me = this;
        if (me.isLeftMouseBtnPressed(evt.event)) {
            var img = me.getImage(),
                el = Ext.get(element),
                offset = me.getImageControlValue(el),
                rec = me.getView().getStore().getAt(0);

            offset = [
                Math.min(0, Math.max(-img.width + el.getWidth(), parseInt(offset[0], 10))) + evt.event.movementX,
                Math.min(0, Math.max(-img.height + el.getHeight(), parseInt(offset[1], 10))) + evt.event.movementY
            ];

            me.setImageControlValue(el, offset.map(function(val) {
                return val + me.getImageControlUnits();
            }).join(' '));

            //rec.set('offset', offset);
        }
    }
});
