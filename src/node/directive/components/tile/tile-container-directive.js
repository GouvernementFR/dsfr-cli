import { Node } from '../../../node.js'

class TileContainerDirective extends Node {
  structure (data) {
    const col = data.properties.col || '';
    const colSm = data.properties.colSm || '';
    const colMd = data.properties.colMd || '';
    const colLg = data.properties.colLg || '';

    return super.structure(
      col || colSm || colMd || colLg ? {
        type: 'htmlContainer',
        tagName: 'div',
        classes: [
          col ? `fr-col-${col}` : '',
          colSm ? `fr-col-sm-${colSm}` : '',
          colMd ? `fr-col-md-${colMd}` : '',
          colLg ? `fr-col-lg-${colLg}` : ''
        ],
        children: [this.structureTile(data)]
      } : this.structureTile(data)
    );
  }

  structureTile(data) {
    const noBorder = data.properties.noBorder || false;
    const pictogramUrl = data.properties.pictogram;
    const image = Node.getImageChild(data);
    const contentChildren = data.children.filter(child => !Node.getImageChild(child));
    const title = contentChildren[0];
    const description = contentChildren[1];
    const details = contentChildren[2];

    return {
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-tile', noBorder ? 'fr-tile--no-border' : ''],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-tile__body'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-tile__content'],
              children: [
                {
                  classes: ['fr-tile__title'],
                  ...title
                },
                description ? {
                  classes: ['fr-tile__desc'],
                  ...description
                } : {},
                details ? {
                  classes: ['fr-tile__detail'],
                  ...details
                } : {},
              ]
            },
          ]
        },
        pictogramUrl || image ? {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-tile__header'],
          children: [
            pictogramUrl ? {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-tile__pictogram'],
              children: [
                {
                  type: 'htmlContainer',
                  classes: ['fr-artwork'],
                  tagName: 'svg',
                  attributes: {
                    'aria-hidden': true,
                    viewBox: '0 0 80 80',
                    width: '80px',
                    height: '80px'
                  },
                  children: [
                    {
                      type: 'htmlContainer',
                      classes: ['fr-artwork-decorative'],
                      tagName: 'use',
                      attributes: {
                        href: pictogramUrl + '#artwork-decorative'
                      }
                    },
                    {
                      type: 'htmlContainer',
                      classes: ['fr-artwork-minor'],
                      tagName: 'use',
                      attributes: {
                        href: pictogramUrl + '#artwork-minor'
                      }
                    },
                    {
                      type: 'htmlContainer',
                      classes: ['fr-artwork-major'],
                      tagName: 'use',
                      attributes: {
                        href: pictogramUrl + '#artwork-major'
                      }
                    }
                  ]
                }
              ]
            } : {},
            image ? {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-tile__img'],
              children: [
                {
                  classe: ['fr-responsive-img'],
                  ...image
                }
              ]
            } : {},
          ]
        } : {},
      ]
    }
  }

}

TileContainerDirective.NAME = 'fr-tile';

export { TileContainerDirective };
