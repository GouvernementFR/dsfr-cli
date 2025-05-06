import { Node } from '../../node.js';

class HpNewsContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const link = data.children[data.children.length - 1];

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-news', 'fr-background-alt--grey'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'h2',
              classes: ['dsfr-doc-hp-news__title'],
              children: title.children
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-news__cards', 'fr-grid-row', 'fr-grid-row--gutters'],
              children: [data.children[1]]
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-news__link'],
              children: [
                {
                  ...link.children[0],
                  classes: ['fr-link', 'fr-link--icon-right', 'fr-icon-arrow-right-line']
                }
              ]
            }
          ]
        }
      ]
    });
  }
}
HpNewsContainerDirective.NAME = 'hp-news';

export { HpNewsContainerDirective };
