import { Node } from '../node.js';

class TableRowNode extends Node {
  constructor (data) {
    data.children = data.children.map((child, index) => {
      child.level = data.level || null;
      child.align = data.align && data.align.length ? data.align[index] : null;
      return child;
    });
    super(data, `tr`);
  }
}

TableRowNode.TYPE = 'tableRow';

export { TableRowNode };
