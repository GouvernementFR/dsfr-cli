import { Node } from '../node.js';
import { convertHTMLEntities } from '@gouvfr/dsfr-cli-utils/src/convert-html-entities.js';

class InlineCodeNode extends Node {
  async render () {
    return `<code>${convertHTMLEntities(this.data.value)}</code>`;
  }
}

InlineCodeNode.TYPE = 'inlineCode';

export { InlineCodeNode };
