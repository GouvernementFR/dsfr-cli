import { PageNode } from '../page-node.js';

class DefinitionNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._identifier = data.identifier;
    this._label = data.label;
    this._url = data.url;
    this._title = data.title;
  }

  get identifier () {
    return this._identifier;
  }

  get label () {
    return this._label;
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
      identifier: this.identifier,
      label: this.label,
      url: this.url,
      title: this.title,
    };
  }
}

DefinitionNode.TYPE = 'definition';

export { DefinitionNode };
