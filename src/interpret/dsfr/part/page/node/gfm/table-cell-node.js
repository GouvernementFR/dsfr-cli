import { PageNode } from '../page-node.js';

class TableCellNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

TableCellNode.TYPE = 'tableCell';

export { TableCellNode };
