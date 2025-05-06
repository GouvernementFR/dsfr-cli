import fs from 'fs';
import yaml from 'yaml';
import { Html } from './html.js';
import { log } from '@gouvfr/dsfr-forge';
import { Renderable } from '../core/renderable.js'

class Page extends Renderable {
  constructor (src) {
    const dataFile = fs.readFileSync(src, 'utf8');
    const data = yaml.parse(dataFile);
    super(data);
    this._src = src;
    this._dest = `${this.data.url}/index.html`;
    this._html = new Html(this.data);
  }

  async render () {
    log.info(`Rendering page ${this._src}`);
    return this._html.render();
  }

  get document () {
    return {
      url: this.data.url,
      title: this.data.title,
      keywords: this.data.keywords,
      summary: this.data.summary,
      excerpt: this.data.excerpt,
      cover: this.data.cover,
      boost: this.data.boost,
      text: this._html.text,
      section: this.data.section,
    }
  }

  get dest () {
    return this._dest;
  }
}

export { Page };
