import { Node } from '../../node.js'

class HpDiscoverTileContainerDirective extends Node {
  structure (data) {
    const image = Node.getImageChild(data);
    const contentChildren = data.children.filter(child => !Node.getImageChild(child));
    const contentTitle = contentChildren[0];
    const contentDescription = contentChildren.slice(1).filter(child => child.children[0].type !== 'link');
    const contentLink = contentChildren.find(child => child.children[0].type === 'link');

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-col-12', 'fr-col-sm-6', 'fr-col-lg-3'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['dsfr-doc-discover-tile'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-discover-tile__container'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-discover-tile__img'],
                  children: [
                    {
                      classes: ['dsfr-doc-discover-tile__img--light'],
                      ...image,
                    },
                    data.imgDarkUrl ? {
                      classes: ['dsfr-doc-discover-tile__img--dark'],
                      type: 'image',
                      attributes: {
                        src: data.imgDarkUrl,
                        alt: image.alt
                      }
                    } : {}
                  ]
                },
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-discover-tile__content'],
                  children: [
                    {
                      ...contentTitle,
                      classes: ['fr-h4'],
                    },
                    ...contentDescription
                  ]
                },
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-discover-tile__link'],
                  children: [
                    {
                      ...contentLink.children[0],
                      classes: ['fr-link', 'fr-link--icon-right', 'fr-icon-arrow-right-line']
                    }
                  ]
                }
              ]
            },
          ]
        }
      ]
    });

  }

}

HpDiscoverTileContainerDirective.NAME = 'hp-discover-tile';

export { HpDiscoverTileContainerDirective };
