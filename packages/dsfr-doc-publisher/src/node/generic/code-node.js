import { Node } from '../node.js';
import { convertHTMLEntities } from '@gouvfr/dsfr-cli-utils';

class CodeNode extends Node {

  constructor (data) {
    super(data);
    this._value = data.value;
    this._lang = data.lang;
    this._meta = data.meta;
  }

  get value () {
    return this._value;
  }

  get lang () {
    return this._lang;
  }

  get meta () {
    return this._meta;
  }

  async render () {
    if (this.lang) this.attributes.addClass(`language-${this.lang}`);
    return `<pre><code${this.renderAttributes()}>${convertHTMLEntities(this.value)}</code></pre>`;
  }
}

CodeNode.TYPE = 'code';

export { CodeNode };
