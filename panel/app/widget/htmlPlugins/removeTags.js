/* global tinymce, Ext */
Ext.define('djem.widget.htmlPlugins.removeTags', {});
(function () {
    tinymce.create('tinymce.plugins.removeTags', {
        init: function (editor) {
            editor.addButton('removeTags', {
                title : 'Remove tags',
                icon: 'removeformat',
                onclick: function () {
                    var sel = editor.dom.decode(editor.selection.getContent());

                    var div = document.createElement('DIV');
                    div.innerHTML = sel;
                    sel = div.textContent || div.innerText || '';

                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                    editor.selection.setContent(sel);
                }
            });
        },
        createControl: function () {
            return null;
        }
    });
    tinymce.PluginManager.add('removeTags', tinymce.plugins.removeTags);
})();
