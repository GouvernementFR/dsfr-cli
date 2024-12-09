import { PageNode } from '../page-node.js';

class CodeNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._lang = data.lang;
    this._meta = data.meta;
  }

  get lang () {
    return this._lang;
  }

  get meta () {
    return this._meta;
  }

  get data () {
    return {
      ...super.data,
      lang: this.lang,
      meta: this.meta,
    };
  }
}

CodeNode.TYPE = 'code';

export { CodeNode };
