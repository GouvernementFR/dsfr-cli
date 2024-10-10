import { Node } from '../node.js';

class ThematicBreakNode extends Node {
  async render() {
    return 'ThematicBreakNode';
  }

}

ThematicBreakNode.TYPE = 'thematicBreak';

export { ThematicBreakNode };
