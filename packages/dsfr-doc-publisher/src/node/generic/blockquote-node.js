import { Node } from '../node.js';

const LEVELS = new Map([
    ['note', { icon: 'information-line', color: 'blue-cumulus' }],
    ['tip', { icon: 'lightbulb-line', color: 'green-emeraude' }],
    ['important', { icon: 'feedback-line', color: 'purple-glycine' }],
    ['warning', { icon: 'alert-line', color: 'yellow-moutarde' }],
    ['caution', { icon: 'spam-2-line', color: 'pink-tuile' }]
  ]);

class BlockquoteNode extends Node {
  constructor (data) {
    if (data?.children?.[0]?.type === 'heading') data.children[0].attributes = { class: 'fr-callout__title' };
    super(data, 'div');
    this.attributes.addClass('fr-callout fr-mb-6v');

    if (data?.level && LEVELS.has(data.level)) {
      const level = LEVELS.get(data.level);
      this.attributes.addClasses(`fr-icon-${level.icon}`, `fr-callout--${level.color}`);
    }
  }
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
