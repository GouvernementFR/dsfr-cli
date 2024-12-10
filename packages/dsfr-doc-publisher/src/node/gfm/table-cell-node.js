import { Node } from '../node.js';

class TableCellNode extends Node {
  constructor (data) {
    const tagName = data?.isThead ? 'th' : 'td';
    super(data, tagName);
    if (this.data?.align !== 'left') this.attributes.addClass(`fr-cell--${this.data.align}`);
  }
}

TableCellNode.TYPE = 'tableCell';

export { TableCellNode };
