import { PageNode } from '../page-node.js';

class HtmlNode extends PageNode {
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
      value: this._value
    }
  }
}

HtmlNode.TYPE = 'html';

export { HtmlNode };
