import { Node } from '../node.js';

class ListItemNode extends Node {
  async render () {
    return `<li>${ await super.render()}</li>`;
  }
}

ListItemNode.TYPE = 'listItem';

export { ListItemNode };
