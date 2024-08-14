import { PageNode } from '../page-node.js';

class InlineCodeNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._value = data.value;
  }

  get value () {
    return this._value;
  }

  get data () {
    return {
      ...super.data,
      value: this.value
    };
  }
}

InlineCodeNode.TYPE = 'inlineCode';

export { InlineCodeNode };
