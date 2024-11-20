import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class BlockquoteNode extends Node {
  async render() {
    log.warn(`Markdown node type 'blockquote' isn't yet supported`);
    return '';
  }
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
