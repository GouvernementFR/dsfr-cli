import { PageNode } from '../page-node.js';

class ParagraphNode extends PageNode {
  constructor (data, state) {
    super(data, state);
  }
}

ParagraphNode.TYPE = 'paragraph';

export { ParagraphNode };
