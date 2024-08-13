import fs from 'fs';
import { PageReader } from './page/page-reader.js';

class DocReader {
  constructor (state, parent, id) {
    this._state = state;
    this._parent = parent;
    this._id = id;
    this._depth = parent ? parent.depth + 1 : 0;
    this._root = parent ? parent.root : this;
    this._children = [];
    this._pages = [];
  }

  get src () {
    return this._state.src;
  }

  get isValid () {
    return this._isValid;
  }

  get id () {
    return this._id;
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

  get isRoot () {
    return this._root === this;
  }

  getPath (locale) {
    return this._pages.find(page => page.locale === locale).path;
  }

  async read () {
    const page = new PageReader(this._state, this, this._state.i18n.default);
    await page.read();
    if (page.partId !== undefined) {
      this._state = this._state.change(page.partId, this);
       await this.read();
      return;
    }
    if (!page.isValid) return;
    this._isValid = true;
    this._pages = [page];

    for (const locale of this._state.i18n.alts) {
      const page = new PageReader(this._state, this, locale);
      await page.read();
      this._pages.push(page);
    }


    const entries = fs.readdirSync(this.src, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const state = this._state.descend(entry.name);
        const doc = new DocReader(state, this, entry.name);
        await doc.read();
        if (doc.isValid) this._children.push(doc);
      }
    }

    if (this._state.part) {
      for (const child of this._state.part.children) {
        const state = this._state.change(child.id);
        const doc = new DocReader(state, this, child.id);
        await doc.read();
        if (doc.isValid) this._children.push(doc);
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
