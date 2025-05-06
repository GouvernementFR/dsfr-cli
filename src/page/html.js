import { Head } from './head/head.js';
import { Footer } from '../component/components/footer.js';
import { DisplayModal } from '../component/components/display-modal.js';
import { Skiplink } from '../component/components/skiplink.js';
import { CustomHeader } from './body/custom-header.js';
import { Scheme } from './body/scheme.js';
import { Main } from './body/main.js';
import { Scripts } from './scripts/scripts.js';
import { HtmlRenderable } from '../core/html-renderable.js';

class Html extends HtmlRenderable {
  constructor(data) {
    super(data);

    this._head = new Head(data);
    this._scheme = new Scheme(data);
    this._skiplink = new Skiplink(data);
    this._header = new CustomHeader(data);
    this._main = new Main(data);
    this._footer = new Footer(data.resource.footer);
    this._displayModal = new DisplayModal(data);
    this._scripts = new Scripts(data);
  }

  async render () {
    return this.format(`<!doctype html>
      <html lang="${this.data.lang}" data-fr-theme>
        ${await this._head.render()}
        <body>
          ${await this._scheme.render()}
          ${await this._skiplink.render()}
          ${await this._header.render()}
          ${await this._main.render()}
          ${await this._footer.render()}
          ${await this._displayModal.render()}
          ${await this._scripts.render()}
        </body>
      </html>`);
  }

  get text () {
    return this._main.text;
  }
}

export { Html };
