import { Node } from '../../node.js'

class GridContainerDirective extends Node {
  constructor (data) {
    super(data, 'div');
    this.attributes.addClass('fr-grid-row');
    if (data.properties.gutters !== false) this.attributes.addClass('fr-grid-row--gutters');
    if (data.properties.alignV) this.attributes.addClass(`fr-grid-row--${data.properties.alignV}`);
    if (data.properties.alignH) this.attributes.addClass(`fr-grid-row--${data.properties.alignH}`);
  }
}

GridContainerDirective.NAME = 'fr-grid';

export { GridContainerDirective };
