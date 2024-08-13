import { PageElement } from './element/page-element.js';

class PageBody {
  constructor (nodes) {
    this._children = nodes.map(node => new PageElement(node));
  }

  get children () {
    return this._children;
  }

  get data () {
    return this._children.map(child => child.data);
  }
}

export { PageBody };
