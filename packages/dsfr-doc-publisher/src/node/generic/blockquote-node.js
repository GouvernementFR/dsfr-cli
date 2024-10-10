import { Node } from '../node.js';

class BlockquoteNode extends Node {
  async render() {
    return 'BlockquoteNode';
  }
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
