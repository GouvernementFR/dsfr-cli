import { PageNode } from '../page-node.js';

class DeleteNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

DeleteNode.TYPE = 'delete';

export { DeleteNode };
