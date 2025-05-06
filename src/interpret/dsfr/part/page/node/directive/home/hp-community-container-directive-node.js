import { DirectiveNode } from '../directive-node.js';

class HpCommunityContainerDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    this._asset = this.addAsset(data.properties.img);
    this._assetDark = this.addAsset(data.properties.imgDark);
  }

  get imgUrl () {
    return this._asset;
  }

  get imgDarkUrl () {
    return this._assetDark;
  }

  get data () {
    return {
      ...super.data,
      imgUrl: this.imgUrl,
      imgDarkUrl: this.imgDarkUrl,
    };
  }
}

HpCommunityContainerDirectiveNode.NAME = 'hp-community';

export { HpCommunityContainerDirectiveNode };
