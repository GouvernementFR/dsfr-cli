import { Node } from '../node.js';

class ListNode extends Node {
  async render () {
    const ordered = this.data.ordered === true;
    const tag = ordered ? 'ol' : 'ul';
    if (ordered && this.data.start !== undefined && !isNaN(this.data.start)) {
      this.attributes.setAttribute('start', this.data.start);
    }

    return `<${tag} ${this.renderAttributes()}>${await super.render()}</${tag}>`;
  }
}

ListNode.TYPE = 'list';

export { ListNode };
