import { Node } from '../../node.js';

class StorybookLeafDirective extends Node {

  // TODO:
  //  - script externe pour le resize de l'iframe
  //  - apossibilité de multiple storybook (baser sur id de la story ?)
  //  - bug resize down
  //  - bouton communication avec iframe pour changer le theme exemple
  //  - changement theme iframe en fonction theme parent
  async render() {
    return `<div class="storybook-leaf"><iframe ${this.renderAttributes()}></iframe></div>`;
  }
}

StorybookLeafDirective.NAME = 'dsfr-doc-storybook';

export { StorybookLeafDirective };
