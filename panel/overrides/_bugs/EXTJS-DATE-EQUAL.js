// EXTJS-DATE-EQUAL
// Fix date compare
/* global Ext */
Ext.define('fix.overrides.Date', {
    override: 'Ext.Date',

    isEqual: function(date1, date2) {
        // check we have 2 date objects
        if (date1 && date2 && typeof date1 === typeof date2) {
            return (date1.getTime() === date2.getTime());
        }
        // one or both isn't a date, only equal if both are falsey
        return !(date1 || date2);
    }
});
