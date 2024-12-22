import { Node } from '../../node.js';

class FigmaLeafDirective extends Node {
  async render() {
    return `
      <div class="dsfr-doc-figma-leaf">
        <iframe
          ${this.renderAttributes()}
          ></iframe>
      </div>
    `;
  }
}

FigmaLeafDirective.NAME = 'dsfr-doc-figma';

export { FigmaLeafDirective };
