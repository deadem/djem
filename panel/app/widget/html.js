/* global Ext, tinymce */
Ext.define('djem.widget.html', {
    extend: 'Ext.form.field.TextArea',
    alias: [ 'djem.html', 'widget.html' ],

    requires: [
        'djem.store.FileUpload',
        'djem.widget.htmlPlugins.removeTags'
    ],
    liquidLayout: false,

    editorConfig: undefined,
    files: null,

    afterBodyEl: '<input type="file" style="display:none;" onchange="Ext.get(this).up().up().fireEvent(\'filechange\', this);">',

    listeners: {
        resize: function (_this, mW, height) {
            this.sizeChanged(_this, mW, height);
        }
    },

    sizeChanged: function (_this, mW, height) {
        var me = this;
        if (!me.editor) {
            // если оставить, то новая правка (onLoadContent tinymce) не отрабатывает
            // Ext.Function.defer(me.sizeChanged, 250, me, [ _this, mW, height ]);
            return;
        }
        var editorIframe = Ext.get(me.getInputId() + '_ifr');
        var editor = tinymce.get(me.getInputId());
        if (!editorIframe || editor.isHidden()) {
            // если оставить, то новая правка (onLoadContent tinymce) не отрабатывает
            // Ext.Function.defer(me.sizeChanged, 250, me, [ _this, mW, height ]);
            return;
        }

        var parent = editorIframe.up('.mce-edit-area');
        parent = parent.up('.mce-container-body');

        var newHeight = height;
        var editorToolbar = parent.down('.mce-toolbar-grp');
        if (editorToolbar) {
            newHeight -= editorToolbar.getHeight();
        }

        if (newHeight < 0) {
            // Это почему то больше не вызывается,
            // т.е. высота теперь всегда приходит корректная
            // Ext.Function.defer(function () { me.up('panel').doLayout(); }, 250);
            return;
        }

        var editorMenubar = parent.down('.mce-menubar');
        if (editorMenubar) {
            newHeight -= editorMenubar.getHeight();
        }

        var editorStatusbar = parent.down('.mce-statusbar');
        if (editorStatusbar) {
            newHeight -= editorStatusbar.getHeight();
        }

        var borderOffset = 3;

        me.lastFrameHeight = newHeight - borderOffset;
        editorIframe.setHeight(newHeight - borderOffset);
    },

    beforeDestroy: function () {
        var me = this;
        var editor = tinymce.get(me.getInputId());
        if (editor) {
            editor.destroy(false);
            var editorIframe = Ext.get(me.getInputId() + '_ifr');
            if (editorIframe) {
                editorIframe.destroy();
            }
        }

        if (me.files) {
            me.files.destroy();
        }
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.files = new Ext.create('djem.store.FileUpload');
        var id = me.inputEl.id;

        me.getEl().on('filechange', function (target) {
            Ext.each(target.files, function (file) {
                file = me.files.lock(file);
                me.files.upload([ file ], function (data) {
                    var ref = Ext.get(target.getAttribute('refField')).dom;
                    if (ref && data && data.length) {
                        ref.value = file.url + '#' + data[0].file;
                    }
                });
            });
        });

        // Копипаста из темы по умолчанию, иначе никак его не получить
        var toolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
                       'bullist numlist outdent indent | link image ';
        if (me.editorConfig && me.editorConfig.mergeToolbar) {
            toolbar += ' | ' + me.editorConfig.mergeToolbar.join(' ');
        }
        toolbar += ' | code ';

        var editor = tinymce.createEditor(id, Ext.apply({
            selector: '#' + id,
            statusbar: false,
            relative_urls: false,
            remove_script_host: true,

            file_browser_callback: function (fieldName, url, type) {
                if (type == 'image') {
                    var el = me.getEl().down('input[type=file]').dom;
                    el.setAttribute('refField', fieldName);
                    el.click();
                }
            },
            plugins: [ 'image', 'link', 'removeTags', 'code' ],
            toolbar: toolbar,
            object_resizing: false,
            image_dimensions: false,

            //elements : id,
            //mode : 'exact',
            //plugins: 'autoresize',
            //autoresize_min_height: 1,
            //autoresize_bottom_margin: 0,
            //autoresize_overflow_padding: 0,
            menubar: false,
            resize: false
        }, me.editorConfig));

        me.editor = editor;

        // set initial value when the editor has been rendered
        editor.on('init', function () {
            editor.setContent(me.value || '');
        });

        editor.on('loadContent', function () {
            Ext.Function.defer(function () {
                me.up('panel').doLayout();
            }, 250);
        });

        // render
        editor.render();

        // --- Relay events to Ext

        editor.on('focus', function () {
            me.fireEvent('focus', me);
        });

        editor.on('blur', function () {
            me.fireEvent('blur', me);
        });

        editor.on('change', function () {
            var content = editor.getContent(),
                previousContent = me.previousContent;
            if (content !== previousContent) {
                me.previousContent = content;
                me.fireEvent('change', me, content, previousContent);
            }
        });
    },
    getRawValue: function () {
        var me = this;
        var editor = me.editor;
        if (editor && editor.initialized) {
            me.rawValue = editor.getContent();
        }
        return me.rawValue;
    },
    setRawValue: function (value) {
        var me = this;
        me.callParent(arguments);

        var editor = me.editor;
        if (editor && editor.initialized && value != editor.getContent()) {
            editor.setContent(value);
            me.previousContent = value;
        }

        return me;
    }
});
