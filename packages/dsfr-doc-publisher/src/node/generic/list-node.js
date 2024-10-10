import { Node } from '../node.js';

class ListNode extends Node {
  async render () {
    const ordered = this.data.ordered === true;
    const tag = ordered ? 'ol' : 'ul';
    const hasStart = this.data.start !== undefined;
    const start = (ordered && hasStart) ? ` start="${this.data.start}"` : '';
    return `<${tag}${start}>${await super.render()}</${tag}>`;
  }
}

ListNode.TYPE = 'list';

export { ListNode };
