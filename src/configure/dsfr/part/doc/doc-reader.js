import fs from 'fs';
import { PageReader } from './page/page-reader.js';

class DocReader {
  constructor (state, parent, part, id) {
    this._state = state;
    this._parent = parent;
    this._up = parent ?? part?.parent?.doc;
    this._ids = [ ...(this._up?._ids ?? []), id];
    this._part = part;
    this._id = id;
    this._depth = parent ? parent.depth + 1 : 0;
    this._children = [];
    this._pages = [];
  }

  get src () {
    return this._state.src;
  }

  get has () {
    return this._has;
  }

  get part () {
    return this._part;
  }

  get id () {
    return this._id;
  }

  get up () {
    return this._up;
  }

  get parent () {
    return this._parent;
  }

  get children () {
    return this._children;
  }

  get depth () {
    return this._depth;
  }

  get path () {
    return this._path;
  }

  getPage(locale) {
    return this._pages.find(page => page.locale.code === locale.code);
  }

  async read () {
    const state = this._state.localize();
    if (!fs.existsSync(state.src)) return;
    const page = new PageReader(state, this);
    await page.read();
    if (!page.has) return;
    this._has = true;
    this._pages = [page];

    this._path = this._ids.join('/');

    for (const locale of this._state.i18n.alts) {
      let state = this._state.localize(locale);
      if (!fs.existsSync(state.src)) state = this._state.localize(locale, true);
      const page = new PageReader(state, this);
      await page.read();
      if (page.has) this._pages.push(page);
    }

    const entries = fs.readdirSync(this.src, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const state = this._state.descend(entry.name);
        const doc = new DocReader(state, this, this._part, entry.name);
        await doc.read();
        if (doc.has) this._children.push(doc);
      }
    }
  }

  async write () {
    for (const page of this._pages) {
      await page.write();
    }

    for (const child of this._children) {
      await child.write();
    }
  }

}

export { DocReader };
