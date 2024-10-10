import { Node } from '../node.js';

class EmphasisNode extends Node {
  async render () {
    return `<i>${super.render()}</i>`;
  }
}

EmphasisNode.TYPE = 'emphasis';

export { EmphasisNode };
