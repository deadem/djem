/* global Ext */
Ext.define('djem.overrides.LoadMask', {
    override: 'Ext.LoadMask',
    msg: '',
    renderTpl: [
        '<div id="{id}-msgWrapEl" data-ref="msgWrapEl" class="{[values.$comp.msgWrapCls]}">',
        '<div id="{id}-msgEl" data-ref="msgEl" class="{[values.$comp.msgCls]} ',
        Ext.baseCSSPrefix,
        'mask-msg-inner {childElCls}">',

        '<svg class="circular" viewBox="25 25 50 50">',
        '<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="0"/>',
        '</svg>',

        '</div>',

        '<div id="{id}-msgTextEl" data-ref="msgTextEl" class="',
        Ext.baseCSSPrefix,
        'mask-msg-text',
        '{childElCls}">{msg}</div>',
        '</div>'
    ]
});
