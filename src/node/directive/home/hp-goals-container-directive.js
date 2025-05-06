import { Node } from '../../node.js'

class HpGoalsContainerDirective extends Node {
  structure (data) {
    const contentTitle = data.children[0];
    const tiles = data.children.filter(child => child.name === 'fr-tile');

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-goals'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              classes: ['dsfr-doc-hp-goals__title'],
              ...contentTitle
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-goals__tiles'],
              children: tiles
            }
          ]
        }
      ]
    });
  }
}

HpGoalsContainerDirective.NAME = 'hp-goals';

export { HpGoalsContainerDirective };
