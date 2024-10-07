import { Template } from '../template.js';
import factory from '../factory.js';

const HOME = 'home';

class Home extends Template {
  constructor (data) {
    super(data, HOME);
  }

  async render () {
    return `
            <div class="fr-container">
                ${await super.render()}
            </div>`;
  }
}

factory.register(HOME, Home);
