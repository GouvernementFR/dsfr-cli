import factory from './node/page-node-factory.js';

class PageMain {
  constructor (nodes, state) {
    this._children = nodes.map(node => factory.getNode(node, state));
  }

  get children () {
    return this._children;
  }

  get data () {
    return this._children.map(child => child.data);
  }
}

export { PageMain };
