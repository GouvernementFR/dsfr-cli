import { Page } from '@gouvfr/dsfr-roller';
import { createFile } from '@gouvfr/dsfr-forge';

class PagePublisher {
  constructor (state, filename) {
    this._state = state;
    this._filename = filename;
  }

  async read () {
    this._page = new Page(this._state.configFile(`pages/${this._filename}`));
    this._document = this._page.document;
  }

  get document () {
    return this._document;
  }


  async write () {
    const html = await this._page.render();
    createFile(`${this._state.dest}${this._page.dest}`, html);
  }

}

export { PagePublisher };
