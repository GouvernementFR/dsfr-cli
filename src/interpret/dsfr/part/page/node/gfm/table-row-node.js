import { PageNode } from '../page-node.js';

class TableRowNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

TableRowNode.TYPE = 'tableRow';

export { TableRowNode };
