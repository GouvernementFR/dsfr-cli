import { Node } from '../node.js';
import { TagAttributes } from '@gouvfr/dsfr-cli-utils';

class ImageNode extends Node {
  async render() {
    const attrs = new TagAttributes();
    attrs.setAttribute('src', this.data.url);
    if (this.data.alt) attrs.setAttribute('alt', this.data.alt);
    if (this.data.title) attrs.setAttribute('title', this.data.title);
    return `<img${attrs.render()}/>`;
  }
}

ImageNode.TYPE = 'image';

export { ImageNode };
