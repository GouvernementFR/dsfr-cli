import { Node } from '../node.js';
import { Action } from '../../component/components/action.js';

class LinkNode extends Node {
  constructor (data) {
    super(data);
    this._action = new Action({
      markup: 'a',
      href: data.url,
      blank: /$(http|www)/.test(data.url)
    });
  }
  async render () {
    return this._action.render({
      label: await super.render(),
      attributes: this.getAttributes()
    });
  }
}

LinkNode.TYPE = 'link';

export { LinkNode };
