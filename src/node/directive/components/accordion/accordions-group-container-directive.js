import { Node } from '../../../node.js'

class AccordionsGroupContainerDirective extends Node {
  constructor (data) {
    super(data, 'div');
    this.attributes.addClass('fr-accordions-group');
  }
}

AccordionsGroupContainerDirective.NAME = 'fr-accordions-group';

export { AccordionsGroupContainerDirective };
