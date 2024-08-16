import { PageNode } from '../page-node.js';
import { ParagraphNode } from './paragraph-node.js';
class ListItemNode extends PageNode {
  constructor(data, state) {
    super(data, state);
    this._spread = data.spread;
    this._checked = data.checked;
    this._flatten();
  }

  get spread() {
    return this._spread;
  }

  get checked() {
    return this._checked;
  }

  get data() {
    const data = {
      ...super.data,
      spread: this.spread
    };

    if (this._checked !== undefined) {
      data.checked = this.checked;
    }

    return data;
  }

  _flatten() {
    const children = [];
    this.children.forEach(child => {
      if (child.type === ParagraphNode.TYPE) {
        children.push(...child.children);
      } else {
        children.push(child);
      }
    });
    this._children = children;
  }
}

ListItemNode.TYPE = 'listItem';

export { ListItemNode };
