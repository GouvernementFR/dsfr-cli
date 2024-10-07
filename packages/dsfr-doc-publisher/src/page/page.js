import fs from 'fs';
import yaml from 'yaml';
import { Head } from './head/head.js';
import { Scheme } from './scripts/scheme.js';
import { Header } from '../component/components/header.js';
import { Footer } from '../component/components/footer.js';
import { Translate } from '../component/components/translate.js';
import { Version } from '../component/components/version.js';
import { Main } from './main/main.js';
import { Scripts } from './scripts/scripts.js';
import htmlParser from 'prettier/parser-html';
import * as prettier from 'prettier';
import { Renderable } from '../core/renderable.js';

class Page extends Renderable {
  constructor (src) {
    const dataFile = fs.readFileSync(src, 'utf8');
    const data = yaml.parse(dataFile);
    super(data);

    this._head = new Head(data);
    this._scheme = new Scheme();
    if (data.translate) this._translate = new Translate(data.translate);
    this._version = new Version(data.version);
    this._header = new Header(data.resource.header);
    this._main = new Main(data);
    this._footer = new Footer(data.resource.footer);
    this._scripts = new Scripts(data);
  }

  async _renderHeader () {
    let toolsContent = await this._version.render({ collapseId: 'version-collapse' });
    if (this._translate) toolsContent += await this._translate.render({ collapseId: 'translate-collapse' });

    let menuContent = await this._version.render({ collapseId: 'version-collapse-menu' });
    if (this._translate) menuContent += await this._translate.render({ collapseId: 'translate-collapse-menu' });

    return await this._header.render({
      body: {
        tools: {
          toolsContent: toolsContent
        }
      },
      menu: {
        tools: {
          toolsContent: menuContent
        }
      }
    });
  }

  async render () {
    const html = `<!doctype html>
<html lang="${this.data.lang}" data-fr-theme>
      ${await this._head.render()}
      <body>
        ${await this._scheme.render()}
        ${await this._renderHeader()}
        ${await this._main.render()}
        ${await this._footer.render()}
        ${await this._scripts.render()}
      </body>
    </html>`;

    return await prettier.format(html, { parser: 'html', plugins: [htmlParser], tabWidth: 2, })
  }

  get dest () {
    return `${this.data.url}/index.html`;
  }
}

export { Page };
