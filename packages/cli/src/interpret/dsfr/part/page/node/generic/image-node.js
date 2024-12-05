import { PageNode } from '../page-node.js';
import { ImageAsset } from '../../../asset/image-asset.js';

class ImageNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._title = data.title;
    this._alt = data.alt;
    this._asset = new ImageAsset(data.url, state);
  }

  get url () {
    return this._asset.url;
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

  get asset () {
    return this._asset.data;
  }
}

ImageNode.TYPE = 'image';

export { ImageNode };
