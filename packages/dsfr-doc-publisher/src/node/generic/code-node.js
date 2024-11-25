import { Node } from '../node.js';
import { convertHTMLEntities } from '@gouvfr/dsfr-cli-utils/src/convert-html-entities.js';

class CodeNode extends Node {
  async render () {
    return `<code>${convertHTMLEntities(this.data.value)}</code>`;
  }
}

CodeNode.TYPE = 'code';

export { CodeNode };
