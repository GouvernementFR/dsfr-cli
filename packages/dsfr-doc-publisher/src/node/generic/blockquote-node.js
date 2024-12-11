import { Node } from '../node.js';

class BlockquoteNode extends Node {
  constructor (data) {
    super(data, 'div');
    this.attributes.addClass('fr-alert fr-mb-6v');

    switch (true) {
      case !data.level:
        break;

      case data.level === 'note':
        this.attributes.addClass('fr-alert--info');
        break;

      case data.level === 'warning':
        this.attributes.addClass('fr-alert--warning');
        break;

      case data.level === 'caution':
        this.attributes.addClass('fr-alert--error');
        break;

      case data.level === 'tip':
        this.attributes.addClass('fr-alert--success');
        break;

      case data.level === 'important':
        this.attributes.addClass('fr-alert--warning');
        break;

      default:
        break;
    }
  }
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
