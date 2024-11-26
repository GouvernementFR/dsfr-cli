import { Node } from '../node.js';
import { convertHTMLEntities } from '@gouvfr/dsfr-cli-utils';

class CodeNode extends Node {

  constructor (data) {
    super(data);
    this._value = data.value;
  }

  get value () {
    return this._value;
  }

  async render () {
    return `<pre><code>${convertHTMLEntities(this.value)}</code></pre>`;
  }
}

CodeNode.TYPE = 'code';

export { CodeNode };
