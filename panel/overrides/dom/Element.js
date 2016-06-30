/* global Ext */
Ext.define('djem.Overrides.LoadMask', {
    override: 'Ext.LoadMask',
    msg: '',
    renderTpl: [
        '<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="{[values.$comp.msgWrapCls]}">',
        '<div id="{id}-msgEl" data-ref="msgEl" class="{[values.$comp.msgCls]} ',
        Ext.baseCSSPrefix,
        'mask-msg-inner {childElCls}">',

        '<div class="app-mask-wrapper">',
        '<div class="app-mask-spinner">',
        '<div class="app-mask-clip-left">',
        '<div></div>',
        '</div>',
        '<div class="app-mask-clip-right">',
        '<div></div>',
        '</div>',
        '</div>',
        '</div>',
        '<div id="{id}-msgTextEl" data-ref="msgTextEl" class="',
        Ext.baseCSSPrefix,
        'mask-msg-text',
        '{childElCls}">{msg}</div>',
        '</div>'
    ]
});
