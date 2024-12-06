import { Node } from '../node.js';

class TableCellNode extends Node {
  constructor (data) {
    const level = data.level && data.level === 'thead' ? 'th' : 'td';
    super(data, level);
    if (this.data.align && this.data.align != 'left') this.attributes.setAttribute('class', `fr-cell--${this.data.align}`);
  }
}

TableCellNode.TYPE = 'tableCell';

export { TableCellNode };
