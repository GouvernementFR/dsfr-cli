import { Node } from '../../node.js';

class HpDiscoverContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const tiles = data.children.slice(1);

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-discover'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              classes: ['dsfr-doc-hp-discover__title'],
              ...title
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-discover__tiles fr-grid-row fr-grid-row--gutters'],
              children: tiles
            }
          ]
        }
      ]
    });
  }
}

HpDiscoverContainerDirective.NAME = 'hp-discover';

export { HpDiscoverContainerDirective };
