import { Node } from '../../node.js';

class HpFaqContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const link = data.children[1];
    const accordions = data.children.filter(child => child.name === 'fr-accordions-group');

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-faq'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-grid-row fr-grid-row--gutters'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-hp-faq__content', 'fr-col-12', 'fr-col-lg-4'],
                  children: [
                    {
                      classes: ['dsfr-doc-hp-faq__title'],
                      ...title
                    },
                    {
                      classes: ['dsfr-doc-hp-faq__link', 'fr-link', 'fr-link--icon-right', 'fr-icon-arrow-right-line'],
                      ...link
                    }
                  ]
                },
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-hp-faq__accordions', 'fr-col-12', 'fr-col-lg-8'],
                  children: accordions
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

HpFaqContainerDirective.NAME = 'hp-faq';

export { HpFaqContainerDirective };
