import { Node } from '../node.js';

class TextNode extends Node {
  async render () {
    return this.data.value;
  }
}

TextNode.TYPE = 'text';

export { TextNode };
