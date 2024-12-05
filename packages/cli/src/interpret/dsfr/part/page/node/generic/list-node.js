import { PageNode } from '../page-node.js';

class ListNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._ordered = data.ordered;
    this._start = data.start;
    this._spread = data.spread;
  }

  get ordered () {
    return this._ordered;
  }

  get start () {
    return this._start;
  }

  get spread () {
    return this._spread;
  }

  get data () {
    return {
      ...super.data,
      ordered: this.ordered,
      start: this.start,
      spread: this.spread
    };
  }
}

ListNode.TYPE = 'list';

export { ListNode };
