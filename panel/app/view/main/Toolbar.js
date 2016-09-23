/* global Ext */
Ext.define('djem.view.main.Toolbar', {
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

    items: [
        {
            text: 'Save',
            scale: 'medium',
            reference: 'save'
        },
        {
            text: '?',
            scale: 'medium',
            reference: 'add'
        },
        {
            text: 'Undo',
            scale: 'medium',
            reference: 'undo'
        },
        {
            text: 'Redo',
            scale: 'medium',
            disabled: true,
            reference: 'redo'
        },
        {
            text: 'Close',
            scale: 'medium',
            reference: 'close'
        },
        '->',
        {
            reference: 'user'
        },
        {
            reference: 'system'
        },
        {
            xtype: 'searchToolbarField',
            scale: 'medium',
            reference: 'search'
        }
/*        ,
        {
            xtype: 'label',
            cls: 'bgcolor-active',
            html: '<div style="font: normal 32px/32px Icons;color:white;">&#xE853;</div>',
            width: 32
        }
*/
    ]
});
