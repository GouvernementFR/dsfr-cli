import { Template } from '../template.js';

class HomeTemplate extends Template {
  constructor (data) {
    super(data);
  }

  async render () {
    return `
      <div id="home">
        ${await super.render()}
      </div>
    `;
  }
}

HomeTemplate.NAME = 'home';

export { HomeTemplate };
