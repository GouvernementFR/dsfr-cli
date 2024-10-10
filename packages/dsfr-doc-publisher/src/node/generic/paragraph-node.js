import { Node } from '../node.js';

class ParagraphNode extends Node {
  async render () {
    return `<p>${await super.render()}</p>`;
  }
}

ParagraphNode.TYPE = 'paragraph';

export { ParagraphNode };
