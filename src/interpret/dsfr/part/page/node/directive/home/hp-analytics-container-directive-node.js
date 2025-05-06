import { DirectiveNode } from '../directive-node.js';

class HpAnalyticsContainerDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    this._img = this.addAsset(data.properties.img);
  }

  get imgUrl () {
    return this._img;
  }

  get data () {
    return {
      ...super.data,
      imgUrl: this.imgUrl,
    };
  }
}

HpAnalyticsContainerDirectiveNode.NAME = 'hp-analytics';

export { HpAnalyticsContainerDirectiveNode };
