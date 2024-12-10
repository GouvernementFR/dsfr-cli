import { Node } from '../node.js';

class TableRowNode extends Node {
  constructor (data) {
    data.children = data.children.map((child, index) => ({
      ...child,
      isThead: data.isThead,
      align: data?.align ? data.align[index] : null
    }));
    super(data, `tr`);
  }
}

TableRowNode.TYPE = 'tableRow';

export { TableRowNode };
