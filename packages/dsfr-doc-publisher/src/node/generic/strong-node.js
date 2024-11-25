import { Node } from '../node.js';

class StrongNode extends Node {
  constructor(data) {
    super(data, 'b');
  }
}

StrongNode.TYPE = 'strong';

export { StrongNode };
