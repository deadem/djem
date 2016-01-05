Ext.define('djem.view.main.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.main-toolbar',
 
    requires: [
        'djem.view.main.ToolbarController',
        'djem.view.main.ToolbarModel'
    ],
    
    controller: 'main-toolbar',
    viewModel: {
        type: 'main-toolbar'
    },

    items: [{
        text: 'Save',
        scale: 'medium',
        glyph: 'xf0c7@FontAwesome',
        reference: 'save'
    }, {
        text: '?',
        scale: 'medium',
        reference: 'add',
/*
        xtype: 'splitbutton',
        menu: new Ext.menu.Menu({
            modal: true,
            items: [{
                text: 'News',
                scale: 'medium',
                glyph: 'xf0f6@FontAwesome',
                height: '2em'
            }, {
                text: 'Document',
                scale: 'medium',
                glyph: 'xf15c@FontAwesome'
            }]
        })
*/
    }, {
        text: 'Undo',
        scale: 'medium',
        glyph: 'xf0e2@FontAwesome',
        reference: 'undo'
    }, {
        text: 'Redo',
        scale: 'medium',
        glyph: 'xf01e@FontAwesome',
        disabled: true,
        reference: 'redo'
    }, {
        text: 'Close',
        scale: 'medium',
        glyph: 'xf00d@FontAwesome',
        reference: 'close'
    }
/*    , '->', {
        xtype    : 'textfield',
        name     : 'search',
        emptyText: 'enter search term'
    }
*/
    ]
});
