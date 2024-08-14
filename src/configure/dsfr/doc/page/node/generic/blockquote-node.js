import { PageNode } from '../page-node.js';

class BlockquoteNode extends PageNode {
  constructor (data, state) {super(data, state);}
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
