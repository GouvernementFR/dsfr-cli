import { Node } from '../../../node.js'

class GuidelinesContainerDirective extends Node {
  constructor (data) {
    super(data, 'div');
    this.attributes.addClass('fr-grid-row');
    this.attributes.addClass('fr-grid-row--gutters');
  }
}

GuidelinesContainerDirective.NAME = 'dsfr-doc-guidelines';

export { GuidelinesContainerDirective };
