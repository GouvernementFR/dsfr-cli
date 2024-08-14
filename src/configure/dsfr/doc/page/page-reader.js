import fs from 'fs';
import yaml from 'yaml';
import { createFile } from '../../../../utilities/file.js';
import { PageContent } from './page-content.js';


class PageReader {
  constructor (state, doc) {
    this._state = state;
    this._doc = doc;
    this._isValid = false;
    this._content = new PageContent(state);
  }

  get src () {
    return this._state.src;
  }

  get dest () {
    return this._state.dest;
  }

  get isValid () {
    return this._isValid;
  }

  get locale () {
    return this._state.i18n.current;
  }

  get path () {
    return this._path;
  }

  get data () {
    return {
      locale: this.locale.code,
      path: this._path,
      ...this._content.data
    }
  }

  get partId () {
    return this._partId;
  }

  getIndex (suffix) {
    const indexSrc = `${this.src}index${suffix}.md`;
    if (fs.existsSync(indexSrc)) return indexSrc;
    if (suffix) return this.getIndex('');
    return null;
  }

  async read () {
    const suffix = this.locale.isDefault ? `@${this.locale.code}` : '';
    const indexSrc = this.getIndex(suffix);
    if (!indexSrc) return;
    this._isValid = true;
    await this._content.read(indexSrc);

    if (this._content.front.part !== undefined) {
      this._partId = this._content.front.part;
      return;
    }

    this._path = this._doc.isRoot ? `${this.locale.code}/${this._state.version.feature}/` : `${this._doc.parent.getPath(this.locale)}${this._content.front.segment}/`;
  }

  async write () {
    const filename = `${this.path}index`.replace(/\//g, '⧸');
    createFile(`${this.dest}${filename}.yml`, yaml.stringify(this.data));
  }


}

export { PageReader };
