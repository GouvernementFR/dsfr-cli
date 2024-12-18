import { Component } from '../component.js';
import { DisplayBody } from './display-body.js';

class DisplayModal extends Component {
  constructor (data) {
    super(data, 'modal');
    this._displayBody = new DisplayBody(data.resource.display);
  }

  get ejsPath () {
    return 'src/dsfr/component/modal/template/ejs/modal.ejs';
  }

  async format () {
    const displayBody = await this._displayBody.render();

    return {
      id: 'display-modal',
      title: this.data.resource.display.title,
      size: 'sm',
      closeButton: {
        label: this.data.fragments.button.close,
      },
      body: `<div id="fr-display" class="fr-display">${displayBody}</div>`,
    };
  }
}

export { DisplayModal };
