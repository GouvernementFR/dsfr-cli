import { templateFactory } from '../../template/template-factory.js';
import { Renderable } from '../../core/renderable.js';

class Main extends Renderable {
  constructor (data) {
    super(data);
    this._template = templateFactory(this.data);
  }

  async render () {
    return `
      <main id="content" role="main">
        ${await this._template.render()}
      </main>
    `;
  }

  get text () {
    return this._template.text;
  }
}

export { Main };
