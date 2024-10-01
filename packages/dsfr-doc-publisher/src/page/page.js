import fs from 'fs';
import yaml from 'yaml';
import { Head } from './head/head.js';
import { Scheme } from './scripts/scheme.js';
import { Header } from './landmarks/header/header.js';
import { Main } from './landmarks/main/main.js';
import { Footer } from './landmarks/footer/footer.js';
import { Scripts } from './scripts/scripts.js';
import * as prettier from 'prettier';
import htmlParser from 'prettier/parser-html';

class Page {
  constructor (src) {
    this._src = src;
  }

  async read () {
    await this._load();
    this._construct();
  }

  async _load () {
    const dataFile = fs.readFileSync(this._src, 'utf8');
    this._data = yaml.parse(dataFile);
  }

  _construct () {
    this._head = new Head(this._data);
    this._scheme = new Scheme();
    this._header = new Header(this._data);
    this._main = new Main(this._data);
    this._footer = new Footer(this._data);
    this._scripts = new Scripts(this._data);
  }

  async render () {
    // await this._head.render();
    await this._header.render();
    await this._main.render();
    await this._footer.render();

    const html =  `<!doctype html>
<html lang="${this._data.lang}" data-fr-theme>
      ${this._head.html}
      <body>
        ${this._scheme.html}
        ${this._header.html}
        ${this._main.html}
        ${this._footer.html}
        ${this._scripts.html}
      </body>
    </html>`;

    this._html = await prettier.format(html, { parser: 'html', plugins: [htmlParser], tabWidth: 2, })
  }

  get html () {
    return this._html;
  }

  get dest () {
    return `${this._data.url}/index.html`;
  }
}

export { Page };
