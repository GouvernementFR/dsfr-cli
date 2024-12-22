import { DirectiveNode } from './directive-node.js';

class FigmaLeafDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    this._src = data.src;
  }

  get src () {
    return this._src;
  }

  get data () {
    return {
      ...super.data,
      src: this._src
    };
  }

}

FigmaLeafDirectiveNode.NAME = 'dsfr-doc-figma';

export { FigmaLeafDirectiveNode };
