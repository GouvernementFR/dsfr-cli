import fs from 'fs';
import yaml from 'yaml';
import { Document } from './document.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class Page {
  constructor (src) {
    this._src = src;
  }

  async read () {
    const dataFile = fs.readFileSync(this._src, 'utf8');
    const data = yaml.parse(dataFile);
    this._document = new Document(data);
    this._dest = `${data.url}/index.html`;
  }

  async render () {
    log.info(`Rendering page ${this._src}`);
    return this._document.render();
  }

  get dest () {
    return this._dest;
  }
}

export { Page };
