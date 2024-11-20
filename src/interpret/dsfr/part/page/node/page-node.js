import { pageNodeFactory } from './page-node-factory.js';

class PageNode {
  constructor (data, state) {
    this._state = state;
    this._type = data.type;
    this._data = data;
    this._children = data.children ? data.children.map(childData => pageNodeFactory(childData, state)) : [];
  }

  get type () {
    return this._type;
  }

  get state () {
    return this._state;
  }

  get children () {
    return this._children;
  }

  get data () {
    const data = {
      type: this._type
    };

    if (this._data.data) data.data = this._data.data;

    if (this._children.length) {
      data.children = this._children.map(child => child.data);
    }

    return data;
  }
}

export { PageNode };
