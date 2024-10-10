import { templateFactory } from '../../template/template-factory.js';
import { Renderable } from '../../core/renderable.js';

class Main extends Renderable{
  constructor (data) {
    super(data);
    this._template = templateFactory(this.data);
  }

  async render () {
    return `
      <main role="main">
        ${await this._template.render()}
      </main>
    `;
  }
}

export { Main };
