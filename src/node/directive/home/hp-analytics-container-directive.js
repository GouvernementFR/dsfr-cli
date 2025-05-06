import { Node } from '../../node.js';

class HpAnalyticsContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const description = data.children[1];
    const link = data.children[2];

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-analytics', 'fr-background-alt--blue-france'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-analytics__img'],
              children: [
                {
                  type: 'image',
                  classes: ['fr-responsive-img'],
                  tagName: 'img',
                  attributes: {
                    src: data.imgUrl,
                    alt: ''
                  }
                }
              ]
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-analytics__content'],
              children: [
                {
                  classes: ['dsfr-doc-hp-analytics__title'],
                  ...title
                },
                {
                  classes: ['dsfr-doc-hp-analytics__desc'],
                  ...description
                },
                {
                  classes: ['dsfr-doc-hp-analytics__link', 'fr-btn', 'fr-btn--secondary'],
                  ...link.children[0],
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

HpAnalyticsContainerDirective.NAME = 'hp-analytics';

export { HpAnalyticsContainerDirective };
