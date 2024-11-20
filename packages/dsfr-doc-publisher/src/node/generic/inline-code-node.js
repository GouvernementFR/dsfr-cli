import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class InlineCodeNode extends Node {
  async render() {
    log.warn(`Markdown node type 'inlineCode' isn't yet supported`);
    return '';
  }

}

InlineCodeNode.TYPE = 'inlineCode';

export { InlineCodeNode };
