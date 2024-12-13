import { Head } from './head/head.js';
import { Translate } from '../component/components/translate.js';
import { Version } from '../component/components/version.js';
import { Header } from '../component/components/header.js';
import { Footer } from '../component/components/footer.js';
import { DisplayModal } from '../component/components/display-modal.js';
import { Renderable } from '../core/renderable.js';
import { CustomHeader } from './body/custom-header.js';
import { Scheme } from './body/scheme.js';
import { Main } from './body/main.js';
import { Scripts } from './body/scripts.js';
import * as prettier from 'prettier';
import htmlParser from 'prettier/parser-html';
import { log } from '@gouvfr/dsfr-cli-utils';

class Document extends Renderable {
  constructor(data) {
    super(data);

    this._head = new Head(data);
    this._scheme = new Scheme(data);
    this._header = new CustomHeader(data);
    this._main = new Main(data);
    this._footer = new Footer(data.resource.footer);
    this._displayModal = new DisplayModal(data);
    this._scripts = new Scripts(data);
  }

  async render () {
    const html = `<!doctype html>
      <html lang="${this.data.lang}" data-fr-theme>
        ${await this._head.render()}
        <body>
          ${await this._scheme.render()}
          ${await this._header.render()}
          ${await this._main.render()}
          ${await this._footer.render()}
          ${await this._displayModal.render()}
          ${await this._scripts.render()}
        </body>
      </html>`;

    let pretty = html;

    try {
      pretty = await prettier.format(html, { parser: 'html', plugins: [htmlParser], tabWidth: 2, });
    }
    catch (error) {
      log.error(`Error while formatting HTML @ ${this.data.src}`);
      log.error(error);
    }

    return pretty;
  }
}

export { Document };
