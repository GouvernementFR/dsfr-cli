import { Node } from '../node.js';

class ListItemNode extends Node {
  constructor (data) {
    super(data, 'li');
  }
}

ListItemNode.TYPE = 'listItem';

export { ListItemNode };
