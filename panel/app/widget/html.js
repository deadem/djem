/* global Ext, CKEDITOR */
Ext.define('djem.widget.html', {
  extend: 'Ext.form.field.TextArea',
  alias: ['widget.djem.html'],

  requires: ['djem.store.FileUpload', 'djem.widget.htmlPlugins.simpleimage'],

  liquidLayout: false,
  labelPad: null,
  labelAlign: 'top',
  labelSeparator: '',

  editorConfig: undefined,
  files: null,

  listeners: { resize: function(_this, width, height) { this.sizeChanged(_this, width, height); } },

  afterComponentLayout: function(width, height) {
    this.callParent(arguments);
    this.sizeChanged(this, width, height);
  },

  sizeChanged: function(_this, width, height) {
    var me = this;
    if (!me.editor || me.editor.status != 'ready') {
      return;
    }
    if (me.hasVisibleLabel() && me.labelEl && me.labelAlign == 'top') {
      height -= me.labelEl.getHeight();
    }
    me.editor.resize('100%', height);
  },

  beforeDestroy: function() {
    var me = this;
    var editor = me.editor;
    if (editor) {
      editor.focusManager.blur(true);
      editor.destroy(true);
      me.editor = undefined;
    }

    if (me.files) {
      me.files.destroy();
    }
  },

  afterRender: function() {
    var me = this;
    me.callParent(arguments);
    me.files = new Ext.create('djem.store.FileUpload');

    me.getEl().addCls('app-field-filled');

    var id = me.inputEl.id;
    var config = {
      customConfig: '',
      allowedContent: true,
      removeDialogTabs: 'link:advanced;link:target',
      extraPlugins: 'simpleimage',
      removePlugins: 'image,elementspath,resize',
      toolbarGroups: [
        { name: 'clipboard', groups: ['undo', 'clipboard'] },
        { name: 'styles' },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] }, { name: 'insert', groups: ['insert'] },
        { name: 'forms', groups: ['forms'] }, { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] }, { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] }, { name: 'about', groups: ['about'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] }
      ],
      stylesSet: me.styles,
      removeButtons: 'Underline,Subscript,Superscript,Scayt,PasteFromWord,Maximize,About,Format,Blockquote' + (me.styles ? '' : ',Styles'),
      format_tags: 'p;pre'
    };

    if (me.contentsCss) {
      config.contentsCss = me.contentsCss;
    }

    var editor = me.editor = CKEDITOR.replace(id, config);

    me.getEl().on('filechange', function(evt, target) {
      Ext.get(document.body).addCls('waitCursor');
      Ext.get(target).setStyle('cursor', 'wait');
      Ext.each(target.files, function(file) {
        file = me.files.lock(file);
        me.files.upload([file], function(data) {
          Ext.get(document.body).removeCls('waitCursor');
          Ext.get(target).setStyle('cursor', 'auto');
          target.setAttribute('uploadedfile', file.url + '#' + data[0].file);
        });
      });
    });

    editor.on('instanceReady', function() {
      me.updateLayout();
      me.editorReady = true;
      me.setRawValue(me.previousContent || '', true);
      Ext.defer(function() { editor.resetUndo(); }, 1);
    });

    editor.on('change', function() {
      var content = editor.getData(), previousContent = me.previousContent;
      if (content !== previousContent) {
        me.previousContent = content;
        me.fireEvent('change', me, content, previousContent);
      }
    });

    editor.on('blur', function() {
      me.onFocusLeave();
      me.onBlur();
    });

    var form = me.up('form');
    editor.on('focus', function() {
      if (editor.window && editor.window.$) {
        editor.window.$.focus();
      }
      form.query('field').forEach(function(item) {
        if (item.hasFocus) {
          item.onFocusLeave();
          item.onBlur();
        }
      });

      // simulate editor focus
      var node = me.getEl().dom;
      ['mouseover', 'mousedown', 'mouseup', 'click'].forEach(function(eventName) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventName, true, true);
        node.dispatchEvent(clickEvent);
      });
      me.onFocus(me);
      setTimeout(function() {
        if (editor.window && editor.window.$) {
          editor.window.$.focus();
        }
      }, 10);
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
  setRawValue: function(value, forced) {
    var me = this;
    me.callParent(arguments);

    var editor = me.editor;
    if (editor && me.editorReady && (forced || value != me.previousContent)) {
      editor.setData(value);
    }
    me.previousContent = value;

    return me;
  }
});
