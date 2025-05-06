import { Node } from '../node.js';

class ListNode extends Node {

  constructor (data) {
    super(data, data.ordered === true ? 'ol' : 'ul');
    if (data.ordered === true && this.data.start !== undefined && !isNaN(this.data.start)) {
      this.attributes.setAttribute('start', this.data.start);
    }
  }
}

ListNode.TYPE = 'list';

export { ListNode };
