import { DirectiveNode } from '../directive-node.js';

class HpSliceVideoContainerDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    this._asset = this.addAsset(data.properties.img);
    if (data.properties.imgDark) this._assetDark = this.addAsset(data.properties.imgDark);
    if (data.properties.imgBg) this._imgBgUrl = this.addAsset(data.properties.imgBg);
    if (data.properties.imgBgDark) this._imgDarkBgUrl = this.addAsset(data.properties.imgBgDark);
  }

  get imgUrl () {
    return this._asset;
  }

  get imgDarkUrl () {
    return this._assetDark;
  }

  get imgBgUrl () {
    return this._imgBgUrl;
  }

  get imgDarkBgUrl () {
    return this._imgDarkBgUrl;
  }

  get data () {
    return {
      ...super.data,
      imgUrl: this.imgUrl,
      imgDarkUrl: this.imgDarkUrl,
      imgBgUrl: this._imgBgUrl,
      imgDarkBgUrl: this._imgDarkBgUrl,
    };
  }
}

HpSliceVideoContainerDirectiveNode.NAME = 'hp-slice-video';

export { HpSliceVideoContainerDirectiveNode };
