import { Page } from '@gouvfr/dsfr-doc-publisher';
import { createFile } from '@gouvfr/dsfr-cli-utils';

class PagePublisher {
  constructor (state) {
    this._state = state;
  }

  async read () {
    this._page = new Page(this._state.src);
    await this._page.read();
  }


  async write () {
    const html = await this._page.render();
    createFile(`${this._state.dest}${this._page.dest}`, html);
  }

}

export { PagePublisher };
