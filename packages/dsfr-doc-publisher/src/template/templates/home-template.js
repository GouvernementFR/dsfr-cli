import { Template } from '../template.js';

class HomeTemplate extends Template {
  constructor (data) {
    super(data);
  }

  async render () {
    return `
            <div class="fr-container">
                ${await super.render()}
            </div>`;
  }
}

HomeTemplate.TYPE = 'home';

export { HomeTemplate };
