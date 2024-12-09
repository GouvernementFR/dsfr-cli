import { PageNode } from '../page-node.js';

class HeadingNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._depth = data.depth;
  }

  get depth () {
    return this._depth;
  }

  get data () {
    return {
      ...super.data,
      depth: this.depth,
    };
  }
}

HeadingNode.TYPE = 'heading';

export { HeadingNode };
