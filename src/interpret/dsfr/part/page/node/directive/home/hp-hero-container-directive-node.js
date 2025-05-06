import { DirectiveNode } from '../directive-node.js';

class HpHeroContainerDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    this._assetFirst = this.addAsset(data.properties.imgFirst);
    this._assetMd = this.addAsset(data.properties.imgMd);
    this._assetDarkFirst = this.addAsset(data.properties.imgDarkFirst);
    this._assetDarkMd = this.addAsset(data.properties.imgDarkMd);
  }

  get imgFirstUrl () {
    return this._assetFirst;
  }

  get imgMdUrl () {
    return this._assetMd;
  }

  get imgDarkFirstUrl () {
    return this._assetDarkFirst;
  }

  get imgDarkMdUrl () {
    return this._assetDarkMd;
  }

  get data () {
    return {
      ...super.data,
      imgFirstUrl: this.imgFirstUrl,
      imgMdUrl: this.imgMdUrl,
      imgDarkFirstUrl: this.imgDarkFirstUrl,
      imgDarkMdUrl: this.imgDarkMdUrl,
    };
  }
}

HpHeroContainerDirectiveNode.NAME = 'hp-hero';

export { HpHeroContainerDirectiveNode };
