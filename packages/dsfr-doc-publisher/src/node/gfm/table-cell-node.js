import { Node } from '../node.js';

const ALIGN = new Map([
  ['center', 'fr-cell--center'],
  ['right', 'fr-cell--right']
]);

class TableCellNode extends Node {
  constructor (data) {
    const tagName = data?.isThead ? 'th' : 'td';
    super(data, tagName);
    if (ALIGN.has(this.data?.align)) this.attributes.addClass(ALIGN.get(this.data.align));
  }
}

TableCellNode.TYPE = 'tableCell';

export { TableCellNode };
