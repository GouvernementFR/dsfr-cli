import { DirectiveNode } from './directive-node.js';

class StorybookLeafDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    data.attributes.src = `/${state.version.text}/storybook/iframe.html?id=${data.properties.id}&nav=0`;
    data.attributes.width = '100%';
    data.attributes.height = '100%';
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

StorybookLeafDirectiveNode.NAME = 'dsfr-doc-storybook';

export { StorybookLeafDirectiveNode };
