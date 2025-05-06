import { DirectiveNode } from '../directive-node.js';

class HpShowcaseCardContainerDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    if (data.properties.imgDark) this._assetDark = this.addAsset(data.properties.imgDark);
  }

  get imgDarkUrl () {
    return this._assetDark;
  }

  get data () {
    return {
      ...super.data,
      imgDarkUrl: this.imgDarkUrl,
    };
  }
}

HpShowcaseCardContainerDirectiveNode.NAME = 'hp-showcase-card';

export { HpShowcaseCardContainerDirectiveNode };
