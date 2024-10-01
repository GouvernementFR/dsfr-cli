import factory from './template/templates.js';

class Main {
  constructor (data) {
    this._data = data;
    this._template = factory.create(data);
  }

  async render () {
    await this._template.render();
  }

  get html () {
    return `
      <main role="main">
        ${this._template.html}
      </main>
    `;
  }
}

export { Main };
