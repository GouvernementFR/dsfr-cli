import { PageNode }  from '../page-node.js';

class ContainerDirectiveNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._name = data.name;
    this._attributes = data.attributes;
  }

  get data () {
    return {
      ...super.data,
      name: this._name,
      attributes: this._attributes,
    };
  }
}

ContainerDirectiveNode.TYPE = 'leafDirective';

export { ContainerDirectiveNode };
