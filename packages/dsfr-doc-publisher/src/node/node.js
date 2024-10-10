import { Renderable } from '../core/renderable.js';
import { nodeFactory } from './node-factory.js';
class Node extends Renderable {
  constructor (data) {
    super(data);
    this._type = data.type;
    this._children = Array.isArray(this.data.children) ? this.data.children.map(childData => nodeFactory(childData)) : [];
  }

  get children () {
    return this._children;
  }

  get type () {
    return this._type;
  }

  async render () {
    let html = '';
    for (const child of this._children) {
      html += await child.render();
    }
    return html;
  }
}

export { Node };
