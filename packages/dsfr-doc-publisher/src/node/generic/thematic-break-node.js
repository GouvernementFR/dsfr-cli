import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class ThematicBreakNode extends Node {
  async render() {
    log.warn(`Markdown node type 'thematicBreak' isn't yet supported`);
    return '';
  }

}

ThematicBreakNode.TYPE = 'thematicBreak';

export { ThematicBreakNode };
