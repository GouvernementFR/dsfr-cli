import { Node } from '../node.js';

class EmphasisNode extends Node {
  constructor (data) {
    super(data, 'i');
  }
}

EmphasisNode.TYPE = 'emphasis';

export { EmphasisNode };
