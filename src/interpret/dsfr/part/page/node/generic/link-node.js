import { PageNode } from '../page-node.js';

class LinkNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._url = state.resolve(data.url);
    this._title = data.title;
  }

  get url () {
    return this._url;
  }

  get title () {
    return this._title;
  }

  get data () {
    return {
      ...super.data,
      url: this.url,
      title: this.title
    };
  }
}

LinkNode.TYPE = 'link';

export { LinkNode };
