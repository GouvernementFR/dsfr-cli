import { pageNodeFactory } from './page-node-factory.js';
import { ImageAsset } from '../../../../../common/asset/image-asset.js';

class PageNode {
  constructor (data, state) {
    this.structure(data, state);
    this._state = state;
    this._type = data.type;
    this._data = data;
    this._assets = [];
    this._children = data.children ? data.children.map(childData => pageNodeFactory(childData, state)) : [];
  }

  structure (data, state) {
    return data;
  }

  get type () {
    return this._type;
  }

  addAsset (url, config = null) {
    const asset = config ? ImageAsset.fromConfig(url, config) : ImageAsset.fromState(url, this.state);
    if (!asset) return url;
    this._assets.push(asset.data);
    return asset.url;
  }

  get state () {
    return this._state;
  }

  get children () {
    return this._children;
  }

  get data () {
    const data = {
      type: this._type
    };

    if (this._data.data) data.data = this._data.data;

    if (this._children.length) {
      data.children = this._children.map(child => child.data);
    }

    return data;
  }

  get assets () {
    const assets = [...this._assets];
    for (const child of this._children) {
      assets.push(...child.assets);
    }
    return assets;
  }
}

export { PageNode };
