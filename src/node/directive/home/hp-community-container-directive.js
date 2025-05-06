import { Node } from '../../node.js';

class HpCommunityContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const tiles = data.children.slice(1);

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-community'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              classes: ['dsfr-doc-hp-community__title'],
              ...title
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-hp-community__container'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-hp-community__img', 'dsfr-doc-hp-community__img--light'],
                  children: [
                    {
                      type: 'image',
                      classes: ['fr-responsive-img'],
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
                  classes: ['dsfr-doc-hp-community__img', 'dsfr-doc-hp-community__img--dark'],
                  children: [
                    {
                      type: 'image',
                      classes: ['fr-responsive-img'],
                      attributes: {
                        src: data.imgDarkUrl,
                        alt: ''
                      }
                    }
                  ]
                },
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-hp-community__tiles'],
                  children: tiles
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

HpCommunityContainerDirective.NAME = 'hp-community';

export { HpCommunityContainerDirective };
