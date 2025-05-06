import { Node } from '../../node.js'

class ImageTextDirective extends Node {
  constructor (data) {
    super(data);
    this._image = this.findDescendantsByType('image')[0];
    if (this.attributes.hasAttribute('responsive') && this._image) this._image.attributes.addClass('fr-responsive-img');
  }
}

ImageTextDirective.NAME = 'dsfr-doc-image';

export { ImageTextDirective };
