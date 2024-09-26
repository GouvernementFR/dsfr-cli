import { Page } from '@gouvfr/dsfr-doc-publisher';
import { createFile } from '../../../../utils/file.js';

class PagePublisher {
  constructor (state) {
    this._state = state;
  }

  get src () {
    return this._src;
  }

  async read () {
    this._page = new Page(this._state.src);
    await this._page.read();
  }


  async write () {
    await this._page.render();
    await createFile(`${this._state.dest}${this._page.dest}`, this._page.html);
  }

}

export { PagePublisher };
