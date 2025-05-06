import { PageNode } from '../page-node.js';

class ImageNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._title = data.title;
    this._alt = data.alt;
    this._url = this.addAsset(data.url);
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
}

ImageNode.TYPE = 'image';

export { ImageNode };
