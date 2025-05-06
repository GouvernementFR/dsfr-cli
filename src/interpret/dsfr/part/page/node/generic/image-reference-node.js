import { PageNode } from '../page-node.js';

class ImageReferenceNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._identifier = data.identifier;
    this._label = data.label;
    this._referenceType = data.referenceType;
    this._alt = data.alt;
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

  get alt () {
    return this._alt;
  }

  get data () {
    return {
      ...super.data,
      identifier: this.identifier,
      label: this.label,
      referenceType: this.referenceType,
      alt: this.alt
    };
  }
}

ImageReferenceNode.TYPE = 'imageReference';

export { ImageReferenceNode };
