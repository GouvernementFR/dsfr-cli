import { Node } from '../node.js';

class StrongNode extends Node {
  async render () {
    return `<b>${await super.render()}</b>`;
  }
}

StrongNode.TYPE = 'strong';

export { StrongNode };
