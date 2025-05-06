import { Node } from '../node.js';

class TableHeadNode extends Node {
  constructor (data) {
    super(data, `thead`);
  }
}

TableHeadNode.TYPE = 'tableHead';

export { TableHeadNode };
