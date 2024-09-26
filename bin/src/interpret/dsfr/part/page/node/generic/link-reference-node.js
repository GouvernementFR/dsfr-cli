import { PageNode } from '../page-node.js';

class LinkReferenceNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._identifier = data.identifier;
    this._label = data.label;
    this._referenceType = data.referenceType;
  }

  get identifier () {
    return this._identifier;
  }

  get label () {
    return this._label;
  }

  get referenceType () {
    return this._referenceType;
  }

  get data () {
    return {
      ...super.data,
      identifier: this.identifier,
      label: this.label,
      referenceType: this.referenceType
    };
  }
}

LinkReferenceNode.TYPE = 'linkReference';

export { LinkReferenceNode };
