import { Node } from '../../node.js';

class HpShowcaseContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const showcaseCards = data.children.filter(child => child.name === 'hp-showcase-card');
    const link = data.children.find(child => child.children[0].type === 'link');

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-showcase'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'h2',
              classes: ['dsfr-doc-hp-showcases__title'],
              children: title.children
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-showcase__container'],
              children: showcaseCards
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-showcase__link'],
              children: [
                {
                  classes: ['fr-btn', 'fr-btn--tertiary'],
                  ...link.children[0]
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

HpShowcaseContainerDirective.NAME = 'hp-showcase';

export { HpShowcaseContainerDirective };
