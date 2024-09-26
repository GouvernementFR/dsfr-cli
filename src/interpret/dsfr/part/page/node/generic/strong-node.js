import { PageNode } from '../page-node.js';

class StrongNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

StrongNode.TYPE = 'strong';

export { StrongNode };
