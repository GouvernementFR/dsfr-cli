import { Node } from '../node.js';
import { convertHTMLEntities } from '@gouvfr/dsfr-cli-utils';

class InlineCodeNode extends Node {
  constructor (data) {
    super(data);
    this._value = data.value;
  }

  get value () {
    return this._value
  }

  async render () {
    return `<code>${convertHTMLEntities(this.value)}</code>`;
  }
}

InlineCodeNode.TYPE = 'inlineCode';

export { InlineCodeNode };
