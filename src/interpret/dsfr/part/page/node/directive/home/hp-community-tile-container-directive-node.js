import { DirectiveNode } from '../directive-node.js';

class HpCommunityTileContainerDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    if (data.properties.img) this._asset = this.addAsset(data.properties.img);
  }

  get imgUrl () {
    return this._asset;
  }

  get data () {
    return {
      ...super.data,
      imgUrl: this.imgUrl,
    };
  }
}

HpCommunityTileContainerDirectiveNode.NAME = 'hp-community-tile';

export { HpCommunityTileContainerDirectiveNode };
