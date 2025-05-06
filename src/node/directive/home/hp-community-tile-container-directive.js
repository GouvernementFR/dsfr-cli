import { Node } from '../../node.js'

class HpCommunityTileContainerDirective extends Node {
  structure (data) {
    const hasIcon = data.properties.icon !== undefined;
    const contentTitle = data.children[0];
    const contentDescription = data.children[1];
    const contentLink = data.children.find(child => child.children[0].type === 'link');

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-community-tile'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['dsfr-doc-hp-community-tile__img', hasIcon ? `fr-icon-${data.properties.icon}` : ''],
          children: [
            data.imgUrl ? {
              type: 'image',
              attributes: {
                src: data.imgUrl,
                alt: ''
              }
            } : {}
          ]
        },
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['dsfr-doc-hp-community-tile__content'],
          children: [
            {
              classes: ['dsfr-doc-hp-community-tile__title'],
              ...contentTitle
            },
            {
              classes: ['dsfr-doc-hp-community-tile__desc'],
              ...contentDescription
            },
            {
              classes: ['dsfr-doc-hp-community-tile__link', 'fr-link', 'fr-link--icon-right', 'fr-icon-arrow-right-line'],
              ...contentLink.children[0]
            }
          ]
        }
      ]
    });

  }

}

HpCommunityTileContainerDirective.NAME = 'hp-community-tile';

export { HpCommunityTileContainerDirective };
