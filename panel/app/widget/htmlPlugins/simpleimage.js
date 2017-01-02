/* global CKEDITOR, Ext */
Ext.define('djem.widget.htmlPlugins.simpleimage', {});
(function() {
  var pluginName = 'simpleimage';

  CKEDITOR.plugins.add(pluginName, {
    requires: 'dialog',
    icons: 'image',
    hidpi: true,
    init: function(editor) {
      if (editor.plugins.image2) {
        return;
      }

      var allowed = 'img[alt,!src]{float}', required = 'img[src]';

      // Register the command.
      editor.addCommand(
        pluginName, new CKEDITOR.dialogCommand(
                      pluginName, { allowedContent: allowed, requiredContent: required, contentTransformations: [] }));

      // Register the toolbar button.
      if (editor.ui.addButton) {
        editor.ui.addButton('image', { label: editor.lang.common.image, command: pluginName, toolbar: 'insert,0' });
      }

      editor.on('doubleclick', function(evt) {
        var element = evt.data.element;

        if (element.is('img') && !element.data('cke-realelement') && !element.isReadOnly()) {
          evt.data.dialog = pluginName;
        }
      });

      // If the "menu" plugin is loaded, register the menu items.
      if (editor.addMenuItems) {
        editor.addMenuItems({ image: { label: editor.lang.image.menu, command: pluginName, group: 'image' } });
      }

      // If the "contextmenu" plugin is loaded, register the listeners.
      if (editor.contextMenu) {
        editor.contextMenu.addListener(function(element) {
          if (getSelectedImage(editor, element)) {
            return { simpleimage: CKEDITOR.TRISTATE_OFF };
          }
        });
      }
    }
  });

  function getSelectedImage(editor, element) {
    if (!element) {
      var sel = editor.getSelection();
      element = sel.getSelectedElement();
    }

    if (element && element.is('img') && !element.data('cke-realelement') && !element.isReadOnly()) {
      return element;
    }
  }

  CKEDITOR.dialog.add(pluginName, function(editor) {
    function onShow() {
      var file = Ext.get('file_image_' + editor.element.getAttribute('id'));
      if (file && (file = file.dom)) {
        file.value = '';
        file.setAttribute('uploadedfile', '');
      }

      var sel = editor.getSelection(), element = sel && sel.getSelectedElement();

      if (element && element.getName() == 'img' && !element.data('cke-realelement')) {
        this.imageElement = element;
      }
    }

    function onOk() {
      var imageElement = this.imageElement || editor.document.createElement('img');

      var file = Ext.get('file_image_' + editor.element.getAttribute('id')).dom;
      file = file.getAttribute('uploadedfile');
      if (file) {
        imageElement.setAttribute('src', file);
      }

      var alt = this.getContentElement('main', 'alt').getValue();
      imageElement.setAttribute('alt', alt || '');
      if (!this.imageElement) {
        editor.insertElement(imageElement);
      }
    }

    return {
      title: editor.lang.image.title,
      minWidth: 420,
      minHeight: 160,
      contents: [{
        id: 'main',
        elements: [
          {
            type: 'html',
            html: '<form>' +
                    '<label>' + editor.lang.image.upload + '<input id="file_image_' +
                    editor.element.getAttribute('id') + '" type="file" astyle="display:none;" onchange="' +
                    'Ext.get(\'' + editor.element.getAttribute('id') + '\')' +
                    '.up().up().up().up().fireEvent(\'filechange\', event, this);">' +
                    '</label>' +
                    '</form>',
            id: 'file'
          },
          { type: 'text', id: 'alt', label: editor.lang.image.alt }
        ]
      }],
      onOk: onOk,
      onShow: onShow
    };
  });
})();
