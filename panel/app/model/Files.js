Ext.define('djem.model.Files', {
    extend: 'Ext.data.Model',

    fields: [ 'id', 'name', 'url', 'data', 'height', 'new', 'file' ],
    idProperty: 'id'
});
