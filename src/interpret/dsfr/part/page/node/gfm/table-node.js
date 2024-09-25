import { PageNode } from '../page-node.js';

class TableNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._align = data.align;
  }

  get align () {
    return this._align;
  }

  get data () {
    return {
      ...super.data,
      align: this.align
    };
  }
}

TableNode.TYPE = 'table';

export { TableNode };
