import { PageNode } from '../page-node.js';

class EmphasisNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

EmphasisNode.TYPE = 'emphasis';

export { EmphasisNode };
