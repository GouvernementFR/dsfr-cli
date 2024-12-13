import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class ThematicBreakNode extends Node {
  constructor(data) {
    super(data, 'hr', true);
  }
}

ThematicBreakNode.TYPE = 'thematicBreak';

export { ThematicBreakNode };
