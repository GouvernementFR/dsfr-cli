import { PageNode } from '../page-node.js';
import { ParagraphNode } from './paragraph-node.js';

class ImageNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._url = data.url;
    this._title = data.title;
    this._alt = data.alt;
    this._flatten();
  }

  get url () {
    return this._url;
  }

  get title () {
    return this._title;
  }

  get alt () {
    return this._alt;
  }

  get data () {
    return {
      ...super.data,
      url: this.url,
      title: this.title,
      alt: this.alt
    };
  }

  _flatten () {
    const children = [];
    this.children.forEach(child => {
      if (child.type === ParagraphNode.TYPE) {
        children.push(...child.children);
      } else {
        children.push(child);
      }
    });
    this._children = children;
  }
}

ImageNode.TYPE = 'image';

export { ImageNode };
