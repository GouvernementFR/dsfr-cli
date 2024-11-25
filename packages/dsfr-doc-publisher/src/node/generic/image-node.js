import { Node } from '../node.js';
import { TagAttributes } from '@gouvfr/dsfr-cli-utils';

class ImageNode extends Node {
  constructor(data) {
    super(data, 'img', true);
    this.attributes.setAttribute('src', this.data.url);
    if (this.data.alt) this.attributes.setAttribute('alt', this.data.alt);
    if (this.data.title) this.attributes.setAttribute('title', this.data.title);
  }
}

ImageNode.TYPE = 'image';

export { ImageNode };
