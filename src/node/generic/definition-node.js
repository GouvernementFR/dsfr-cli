import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-forge';

class DefinitionNode extends Node {
  async render() {
    log.warn(`Markdown node type 'definition' isn't yet supported`);
    return '';
  }
}

DefinitionNode.TYPE = 'definition';

export { DefinitionNode };
