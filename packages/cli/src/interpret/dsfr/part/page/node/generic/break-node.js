import { PageNode } from '../page-node.js';

class BreakNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

BreakNode.TYPE = 'break';

export { BreakNode };
