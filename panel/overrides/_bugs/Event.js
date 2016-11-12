// https://www.sencha.com/forum/showthread.php?316681-Error-Permission-denied-to-access-property-quot-nodeType-quot-in-M-Firefox-48-0/page2
/* global Ext */
Ext.define('fix.overrides.Event', {
    override: 'Ext.event.Event'
});

Ext.event.Event.resolveTextNode = function(node) {
    var nodeType = 1;

    try {
        nodeType = node && node.nodeType;
    } catch (err) {
        // Firefox fix
    }

    return nodeType === 3 ? node.parentNode : node;
};
