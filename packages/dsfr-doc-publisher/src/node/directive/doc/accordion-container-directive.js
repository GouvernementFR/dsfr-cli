import { Node } from '../../node.js';

class AccordionContainerDirective extends Node {
  constructor (data) {
    super(data);
    this._title = this.findDescendantsByType('leafDirective')[0];
  }

  async render () {
    this.attributes.addClass('fr-collapse');

    return `
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button type="button" class="fr-accordion__btn" aria-expanded="false" aria-controls="${this._attributes._attributes.id}">${this._title.attributes._attributes.title}</button>
        </h3>
        <div ${this.renderAttributes()}>
          ${await super.render()}
        </div>
      </section>
    `;
  }
}

AccordionContainerDirective.NAME = 'dsfr-doc-accordion';

export { AccordionContainerDirective };
