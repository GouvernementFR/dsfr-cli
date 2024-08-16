import { PageNode } from '../page-node.js';

class TextNode extends PageNode {
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

TextNode.TYPE = 'text';

export { TextNode };
