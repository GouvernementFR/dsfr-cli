import { Node } from '../node.js';

class LinkReferenceNode extends Node {
  async render() {
    return 'LinkReferenceNode';
  }

}

LinkReferenceNode.TYPE = 'linkReference';

export { LinkReferenceNode };
