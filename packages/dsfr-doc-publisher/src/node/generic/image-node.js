import { Node } from '../node.js';

class ImageNode extends Node {
  async render() {
    return 'ImageNode';
  }
}

ImageNode.TYPE = 'image';

export { ImageNode };
