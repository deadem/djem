// Похожая ошибка но не та - https://www.sencha.com/forum/showthread.php?331199-Clicking-whitespace-below-grid-rows-throws-quot-Cannot-read-property-isModel-of-null-quot
// Клик по гриду мимо записей. После клика на соседний грид
// 1. Клик в дерево слева (в любое место)
// 2. Клик в дерево справа мимо записей.
/* global Ext */
Ext.define('fix.overrides.Table', {
  override: 'Ext.view.Table',

  getDefaultFocusPosition: function(fromComponent) {
    var me = this, store = me.dataSource, focusPosition = me.lastFocused,
        newPosition = new Ext.grid
                              .CellContext((me.isNormalView && me.lockingPartner.grid.isVisible() &&
                                            !me.lockingPartner.grid.collapsed)
                                                   ? me.lockingPartner
                                                   : me)
                              .setPosition(0, 0),
        targetCell, scroller;
    if (fromComponent) {
      // Tabbing in from one of our column headers; the user will expect to land in that column.
      // Unless it is configured cellFocusable: false
      if (fromComponent.isColumn && fromComponent.cellFocusable !== false && fromComponent.getView() === me) {
        if (!focusPosition) {
          focusPosition = newPosition;
        }
        focusPosition.setColumn(fromComponent);
      }
      // Tabbing in from the neighbouring TableView (eg, locking).
      // Go to column zero, same record
      else if (fromComponent.isTableView && fromComponent === me) {
        focusPosition = new Ext.grid.CellContext(me).setPosition(fromComponent.lastFocused.record, 0);
      }
    }
    // We found a position from the "fromComponent, or there was a previously focused context
    if (focusPosition) {
      scroller = me.getScrollable();
      // Record is not in the store, or not in the rendered block.
      // Fall back to using the same row index.
      if (!store.contains(focusPosition.record) || (scroller && !scroller.isInView(focusPosition.getRow()).y)) {
        focusPosition.setRow(store.getAt(Math.min(focusPosition.rowIdx, store.getCount() - 1)));
      }
    } else // All else failes, find the first focusable cell.
    {
      focusPosition = newPosition;
      // Find the first focusable cell.
      targetCell = me.ownerGrid.view.el.down(me.getCellSelector() + '[tabIndex="-1"]');
      if (targetCell) {
        focusPosition.setPosition(me.getRecord(targetCell), me.getHeaderByCell(targetCell));
      } else // All visible columns are cellFocusable: false
      {
        focusPosition = null;
      }
    }
    return focusPosition;
  }
});