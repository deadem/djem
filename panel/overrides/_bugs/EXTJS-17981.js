// EXTJS-17981
// ChainedStore getByInternalId fails if called after filtering
/* global Ext */
Ext.define('fix.overrides.Store', {
    override: 'Ext.data.Store',

    getByInternalId: function(internalId) {
        var data = this.getData(),
            keyCfg;

        // Defer the creation until we need it
        if (!this.hasInternalKeys) {
            keyCfg = {
                byInternalId: {
                    property: 'internalId',
                    rootProperty: ''
                }
            };
            this.hasInternalKeys = true;
        }

        if (data.filtered) {
            if (keyCfg) {
                data.setExtraKeys(keyCfg);
            }
            data = data.getSource();
        }

        if (keyCfg) {
            data.setExtraKeys(keyCfg);
        }

        if (data.byInternalId) {
            return data.byInternalId.get(internalId) || null;
        }

        var rec = null;

        data.each(function(item) {
            if (item.internalId == internalId) {
                rec = item;
                return false;
            }
        });
        return rec;
    }
});
