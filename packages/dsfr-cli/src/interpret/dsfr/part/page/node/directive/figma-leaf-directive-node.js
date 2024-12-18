import { DirectiveNode } from './directive-node.js';

class FigmaLeafDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    data.attributes = data.attributes || {};
    super(data, state);
    data.attributes.width = data.attributes.width || '100%';
    data.attributes.height = data.attributes.height || '100%';
  }

  get src () {
    return this._data.src;
  }

  get data () {
    return {
      ...super.data,
      src: this.src
    };
  }

}

FigmaLeafDirectiveNode.NAME = 'dsfr-doc-figma';

export { FigmaLeafDirectiveNode };
