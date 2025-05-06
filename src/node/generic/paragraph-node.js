import { Node } from '../node.js';

class ParagraphNode extends Node {
  constructor (data) {
    super(data, 'p');
  }
}

ParagraphNode.TYPE = 'paragraph';

export { ParagraphNode };
