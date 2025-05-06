import { Node } from '../node.js';

class TableRowNode extends Node {
  constructor (data, tagName = 'tr') {
    super(data, tagName);
  }
}

TableRowNode.TYPE = 'tableRow';

export { TableRowNode };
