import { TableCellNode } from './table-cell-node.js';

class TableHeaderNode extends TableCellNode {
  constructor (data) {
    super(data, 'th');
    if (this.data.scope) {
      this.attributes.setAttribute('scope', this.data.scope);
      if (this.data.scope === 'row') this.attributes.addClass('fr-cell--fixed');
    }
    if (this.data.isColumnHeader) this.attributes.setAttribute('role', 'columnheader');
  }
}

TableHeaderNode.TYPE = 'tableHeader';

export { TableHeaderNode };
