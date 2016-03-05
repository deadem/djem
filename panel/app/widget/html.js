/* global Ext, tinymce */
Ext.define('djem.widget.html', {
    extend: 'Ext.form.field.TextArea',
    alias: [ 'djem.html', 'widget.html' ],

    editorConfig: undefined,

    liquidLayout: false,

    listeners: {
        resize: function (_this, mW, height) {
            var me = this;
            if (!me.editor) {
                return;
            }
            var editorIframe = Ext.get(me.getInputId() + '_ifr');
            console.log(editorIframe);
            var editor = tinymce.get(me.getInputId());
            if (!editorIframe || editor.isHidden()) {
                return;
            }

            var parent = editorIframe.up('.mce-edit-area');
            parent = parent.up('.mce-container-body');

            var newHeight = height;
            var editorToolbar = parent.down('.mce-toolbar-grp');
            if (editorToolbar) {
                newHeight -= editorToolbar.getHeight();
            }

            var editorMenubar = parent.down('.mce-menubar');
            if (editorMenubar) {
                newHeight -= editorMenubar.getHeight();
            }

            var editorStatusbar = parent.down('.mce-statusbar');
            if (editorStatusbar) {
                newHeight -= editorStatusbar.getHeight();
            }

            var borderOffset = 2;

            me.lastFrameHeight = newHeight - borderOffset;
            editorIframe.setHeight(newHeight - borderOffset);
        }
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var id = me.inputEl.id;

        var editor = tinymce.createEditor(id, Ext.apply({
            selector: '#' + id,
            resize: false,
            statusbar: false,
            //elements : id,
            //mode : 'exact',
            //plugins: 'autoresize',
            //autoresize_min_height: 1,
            //autoresize_bottom_margin: 0,
            //autoresize_overflow_padding: 0,
            menubar: false
        }, me.editorConfig));

        me.editor = editor;

        // set initial value when the editor has been rendered
        editor.on('init', function () {
            editor.setContent(me.value || '');
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
