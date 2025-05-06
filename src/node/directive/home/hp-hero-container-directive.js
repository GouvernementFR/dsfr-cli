import { Node } from '../../node.js';

class HpHeroContainerDirective extends Node {
  constructor (data) {
    super(data);
    this.imgFirstUrl = data.imgFirstUrl;
    this.imgMdUrl = data.imgMdUrl;
    this.imgDarkFirstUrl = data.imgDarkFirstUrl;
    this.imgDarkMdUrl = data.imgDarkMdUrl;
  }

  structure (data) {
    const title = data.children[0];
    const description = data.children[1];
    const link = data.children[2];

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-hero__content'],
      children: [
        title,
        description,
        {
          classes: ['dsfr-doc-hp-hero__link', 'fr-btn'],
          ...link.children[0]
        }
      ]
    });
  }

  async render () {
    return `
      <div class="dsfr-doc-hp-hero">
        <div class="fr-container">
          <div class="dsfr-doc-hp-hero__img">
            <img class="fr-hidden-md" src="${this.imgFirstUrl}" alt="">
            <img class="fr-hidden fr-unhidden-md" src="${this.imgMdUrl}" alt="">
          </div>
          <div class="dsfr-doc-hp-hero__img dsfr-doc-hp-hero__img--dark">
            <img class="fr-hidden-md" src="${this.imgDarkFirstUrl}" alt="">
            <img class="fr-hidden fr-unhidden-md" src="${this.imgDarkMdUrl}" alt="">
          </div>

          ${await super.render()}
        </div>
      </div>
    `;
  }
}

HpHeroContainerDirective.NAME = 'hp-hero';

export { HpHeroContainerDirective };
