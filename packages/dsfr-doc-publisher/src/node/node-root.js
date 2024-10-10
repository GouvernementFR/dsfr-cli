import { Node } from './node.js';
import { adjustHeading } from './generic/heading-node.js';

const gather = (node) => {
  const nodes = node.children.map(child => gather(child)).flat();
  nodes.push(node);
  return nodes;
}

class NodeRoot extends Node {
  constructor (data) {
    super(data);
    this._nodes = gather(this);
  }

  async render () {
    adjustHeading(this._nodes.filter(node => node.type === 'heading'));

    return await super.render();
  }
}

NodeRoot.TYPE = 'root';

export { NodeRoot };
