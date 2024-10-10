import { Node } from '../node.js';

class CodeNode extends Node {
  async render() {
    return `<code>${await super.render()}</code>`;
  }
}

CodeNode.TYPE = 'code';

export { CodeNode };
