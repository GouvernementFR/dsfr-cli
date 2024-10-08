import { Node } from '../node.js';
import { Action } from '../../component/components/action.js';

class LinkNode extends Node {
  constructor (data) {
    super(data);
    this._action = new Action({
      kind: 'link',
      href: data.url,
      blank: /$(http|www)/.test(data.url)
    });
  }
  async render () {
    return this._action.render({
      label: await super.render()
    });
  }
}

LinkNode.TYPE = 'link';

export { LinkNode };
