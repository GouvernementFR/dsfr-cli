import yaml from 'yaml';
import { PageNode }  from '../page-node.js';

class DirectiveNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._name = data.name;
    this._properties = data.properties;
  }

  structure (data, state) {
    const properties = data.attributes;
    data.attributes = properties.attributes ? yaml.parse(properties.attributes) : {};
    delete properties.attributes;
    data.properties = properties;

    return super.structure(data, state);
  }

  get properties () {
    return this._properties;
  }

  get name () {
    return this._name;
  }

  get data () {
    return {
      ...super.data,
      name: this.name,
      properties: this.properties,
      attributes: this.attributes,
    };
  }
}

export { DirectiveNode };
