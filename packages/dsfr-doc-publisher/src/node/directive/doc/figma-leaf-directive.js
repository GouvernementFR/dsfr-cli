import { Node } from '../../node.js';

class FigmaLeafDirective extends Node {
  constructor (data) {
    super(data, 'iframe');
    if (!this.attributes.hasAttribute('width')) this.attributes.setAttribute('width', '100%');
    if (!this.attributes.hasAttribute('height')) this.attributes.setAttribute('height', '100%');
  }

  async render() {
    return `
      <div class="dsfr-doc-figma-leaf">
        ${await super.render()}
      </div>
    `;
  }
}

FigmaLeafDirective.NAME = 'dsfr-doc-figma';

export { FigmaLeafDirective };
