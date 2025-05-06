import { Node } from '../../node.js';

class HpShowcaseCardContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    this._data = data;
    this._image = Node.getImageChild(data);
    this._links = data.children[0]?.children?.filter(child => child.type === 'link');
    this._structureImgDark = this.structureImgDark;
    this._structureLinks = this.structureLinks;

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-showcase-card'],
      children: [
        {
          type: 'link',
          classes: ['dsfr-doc-hp-showcase-card__img'],
          url: this._links[0].url,
          title: this._links[0].title || this._links[0].children[0].value || this._image.alt,
          children: [
            {
              classes: ['fr-responsive-img', data.imgDarkUrl ? 'dsfr-doc-hp-showcase-card__img--light' : ''],
              ...this._image
            },
            this._structureImgDark,
          ]
        },
        this._structureLinks
      ]
    });
  }

  get structureImgDark() {
    let structureImgDark = {};
    if (this._data.imgDarkUrl) structureImgDark = {
      classes: ['fr-responsive-img', 'dsfr-doc-hp-showcase-card__img--dark'],
      type: 'image',
      attributes: {
        src: this._data.imgDarkUrl,
        alt: this._image.alt
      }
    }
    return structureImgDark;
  }

  get structureLinks() {
    let structureLinks = {
      ...this._links[0],
      classes: ['dsfr-doc-hp-showcase-card__link', 'fr-link'],
    };
    if (this._links.length > 1) {
      structureLinks = {
        type: 'htmlContainer',
        tagName: 'ul',
        classes: ['dsfr-doc-hp-showcase-card__links-group'],
        children: this._links.map(link => {
          return {
            type: 'htmlContainer',
            tagName: 'li',
            children: [
              {
                ...link,
                classes: ['dsfr-doc-hp-showcase-card__link', 'fr-link', 'fr-link--icon-right', 'fr-icon-arrow-right-line'],
              }
            ]
          }
        })
      }
    }
    return structureLinks;
  }
}

HpShowcaseCardContainerDirective.NAME = 'hp-showcase-card';

export { HpShowcaseCardContainerDirective };
