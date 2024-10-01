import { Template } from './template.js';
import factory from './factory.js';

const HOME = 'home';

class Home extends Template {
  constructor (data) {
    super(data, HOME);
  }

  async render () {

  }

  get html () {
    return `
            <div class="fr-container">
                HOME
            </div>`;
  }
}

factory.register(HOME, Home);
