import { Node } from '../node.js';

class ImageReferenceNode extends Node {
  async render() {
    return 'ImageReferenceNode';
  }

}

ImageReferenceNode.TYPE = 'imageReference';

export { ImageReferenceNode };
