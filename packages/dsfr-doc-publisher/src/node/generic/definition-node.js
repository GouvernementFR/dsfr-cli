import { Node } from '../node.js';

class DefinitionNode extends Node {
  async render() {
    return 'definition';
  }
}

DefinitionNode.TYPE = 'definition';

export { DefinitionNode };
