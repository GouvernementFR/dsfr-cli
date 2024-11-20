import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class ImageReferenceNode extends Node {
  async render() {
    log.warn(`Markdown node type 'imageReference' isn't yet supported`);
    return '';
  }

}

ImageReferenceNode.TYPE = 'imageReference';

export { ImageReferenceNode };
