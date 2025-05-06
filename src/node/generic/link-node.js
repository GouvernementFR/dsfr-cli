import { Node } from '../node.js';
import { Action } from '../../component/components/action.js';

class LinkNode extends Node {
  constructor (data) {
    super(data);
    const blank = /^(http|www)/.test(data.url);
    const actionData = {
      markup: 'a',
      href: data.url,
      blank
    };
    if (blank) actionData.attributes = { title: `${data.title || this.text} - ${data.fragments.blank}` };
    this._action = new Action(actionData);
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
