import { PageNode } from '../page-node.js';

class CodeNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._lang = data.lang;
    this._meta = data.meta;
    this._value = data.value;
  }

  get lang () {
    return this._lang;
  }

  get meta () {
    return this._meta;
  }

  get value () {
    return this._value;
  }

  get data () {
    return {
      ...super.data,
      lang: this.lang,
      meta: this.meta,
      value: this.value
    };
  }
}

CodeNode.TYPE = 'code';

export { CodeNode };
