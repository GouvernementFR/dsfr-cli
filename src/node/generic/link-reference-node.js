import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-forge';

class LinkReferenceNode extends Node {
  async render() {
    log.warn(`Markdown node type 'linkReference' isn't yet supported`);
    return '';
  }

}

LinkReferenceNode.TYPE = 'linkReference';

export { LinkReferenceNode };
