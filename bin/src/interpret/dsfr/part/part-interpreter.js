import fs from 'fs';
import yaml from 'yaml';
import { PageInterpreter } from './page/page-interpreter.js';

class PartInterpreter {
  constructor (state) {
    this._state = state;
  }

  get id () {
    return this._data.id;
  }

  get src () {
    return this._state.src;
  }

  async read () {
    const dataFile = fs.readFileSync(`${this._state.src}/data.yml`, 'utf8');
    this._data = yaml.parse(dataFile);

    this._pages = [];

    for (const locale of this._state.i18n.locales) {
      const localState = this._state.localize(locale);
      const filenames = this._data?.doc?.pages?.[locale.code];
      if (!filenames) continue;
      for (const filename of filenames) {
        const state = localState.descend(`flatplan/${filename}`, `pages/${filename}`);
        const page = new PageInterpreter(state);
        await page.read();
        this._pages.push(page);
      }
    }
  }

  async interpret () {
    for (const page of this._pages) {
      await page.interpret();
    }
  }

  async write () {
    for (const page of this._pages) {
      await page.write();
    }
  }
}

export { PartInterpreter };
