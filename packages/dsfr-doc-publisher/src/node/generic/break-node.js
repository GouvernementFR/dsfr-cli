import { Node } from '../node.js';

class BreakNode extends Node {
  async render() {
    return '<br>';
  }
}

BreakNode.TYPE = 'break';

export { BreakNode };
