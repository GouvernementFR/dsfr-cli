import { Node } from '../node.js';

class InlineCodeNode extends Node {
  async render() {
    return 'InlineCodeNode';
  }

}

InlineCodeNode.TYPE = 'inlineCode';

export { InlineCodeNode };
