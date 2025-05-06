import { PageNode } from '../page-node.js';

class ThematicBreakNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

ThematicBreakNode.TYPE = 'thematicBreak';

export { ThematicBreakNode };
