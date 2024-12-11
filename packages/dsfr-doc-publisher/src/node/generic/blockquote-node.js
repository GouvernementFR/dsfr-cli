import { Node } from '../node.js';

class BlockquoteNode extends Node {
  constructor (data) {
    if (data?.children?.[0]?.type === 'heading') data.children[0].attributes = { class: 'fr-callout__title' };
    super(data, 'div');
    this.attributes.addClass('fr-callout fr-mb-6v');

    switch (true) {
      case !data.level:
        break;

      case data.level === 'note':
        this.attributes.addClass('fr-icon-information-line fr-callout--blue-cumulus');
        break;

      case data.level === 'warning':
        this.attributes.addClass('fr-icon-alert-line fr-callout--yellow-moutarde');
        break;

      case data.level === 'caution':
        this.attributes.addClass('fr-icon-error-warning-line fr-callout--pink-tuile');
        break;

      case data.level === 'tip':
        this.attributes.addClass('fr-icon-lightbulb-line fr-callout--green-emeraude');
        break;

      case data.level === 'important':
        this.attributes.addClass('fr-icon-feedback-line fr-callout--purple-glycine');
        break;

      default:
        break;
    }
  }
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
