/* global Ext, CKEDITOR */
Ext.define('djem.widget.html', {
    extend: 'Ext.form.field.TextArea',
    alias: [ 'djem.html', 'widget.html' ],

    requires: [
        'djem.store.FileUpload'
    ],
    liquidLayout: false,

    editorConfig: undefined,
    files: null,

    afterBodyEl: '<input type="file" style="display:none;" onchange="Ext.get(this).up().up().fireEvent(\'filechange\', event, this);">',

    listeners: {
        resize: function(_this, width, height) {
            this.sizeChanged(_this, width, height);
        }
    },

    afterComponentLayout: function(width, height) {
        this.callParent(arguments);
        this.sizeChanged(this, width, height);
    },

    sizeChanged: function(_this, width, height) {
        var me = this;
        if (!me.editor || me.editor.status != 'ready') {
            return;
        }
        me.editor.resize('100%', height);
    },

    beforeDestroy: function() {
        var me = this;
        var editor = me.editor;
        if (editor) {
            editor.destroy(true);
        }

        if (me.files) {
            me.files.destroy();
        }
    },

    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.files = new Ext.create('djem.store.FileUpload');

        var id = me.inputEl.id;
        var editor = me.editor = CKEDITOR.replace(id, {
            customConfig: '',
            allowedContent: true,
            removeDialogTabs: 'image:advanced;image:link;link:advanced;link:target',
            removePlugins: 'elementspath,resize',
            toolbarGroups: [
                { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                { name: 'links', groups: [ 'links' ] },
                { name: 'insert', groups: [ 'insert' ] },
                { name: 'forms', groups: [ 'forms' ] },
                { name: 'tools', groups: [ 'tools' ] },
                { name: 'others', groups: [ 'others' ] },
                { name: 'styles', groups: [ 'styles' ] },
                { name: 'colors', groups: [ 'colors' ] },
                { name: 'about', groups: [ 'about' ] },
                { name: 'document', groups: [ 'mode', 'document', 'doctools' ] }
            ],
            removeButtons: 'Underline,Subscript,Superscript,Scayt,PasteFromWord,Maximize,About,Styles,Format,Blockquote',
            format_tags: 'p;pre'
        });

        me.getEl().on('filechange', function(evt, target) {
            Ext.each(target.files, function(file) {
                file = me.files.lock(file);
                me.files.upload([ file ], function(data) {
                    var ref = Ext.get(target.getAttribute('refField')).dom;
                    if (ref && data && data.length) {
                        ref.value = file.url + '#' + data[0].file;
                    }
                });
            });
        });

        editor.on('instanceReady', function() {
            me.updateLayout();
        });

        editor.on('change', function() {
            var content = editor.getData(),
                previousContent = me.previousContent;
            if (content !== previousContent) {
                me.previousContent = content;
                me.fireEvent('change', me, content, previousContent);
            }
        });

        editor.on('focus', function() {
            // simulate editor focus
            var node = me.getEl().dom;
            [ 'mouseover', 'mousedown', 'mouseup', 'click' ].forEach(function(eventName) {
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent(eventName, true, true);
                node.dispatchEvent(clickEvent);
            });
        });
    },
    getRawValue: function() {
        var me = this;
        var editor = me.editor;
        if (editor) {
            me.rawValue = editor.getData();
        }
        return me.rawValue;
    },
    setRawValue: function(value) {
        var me = this;
        me.callParent(arguments);

        var editor = me.editor;
        if (editor && value != editor.getData()) {
            editor.setData(value);
            me.previousContent = value;
        }

        return me;
    }
});
