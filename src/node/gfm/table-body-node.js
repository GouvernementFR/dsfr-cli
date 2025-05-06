import { Node } from '../node.js';

class TableBodyNode extends Node {
  constructor (data) {
    super(data, `tbody`);
  }
}

TableBodyNode.TYPE = 'tableBody';

export { TableBodyNode };
