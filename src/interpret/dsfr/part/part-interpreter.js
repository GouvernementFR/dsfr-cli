import fs from 'fs';
import yaml from 'yaml';
import { PageInterpreter } from './page/page-interpreter.js';
import { createFile } from '@gouvfr/dsfr-forge';

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
    const dataFile = fs.readFileSync(this._state.configFile('data.yml'), 'utf8');
    this._data = yaml.parse(dataFile);

    this._pages = [];

    for (const locale of this._state.i18n.locales) {
      const localState = this._state.localize(locale);
      const filenames = this._data?.doc?.pages?.[locale.code];
      if (!filenames) continue;
      for (const filename of filenames) {
        const page = new PageInterpreter(localState, filename);
        await page.read();
        this._pages.push(page);
      }
    }
  }

  async write () {
    const assets = [];
    for (const page of this._pages) {
      assets.push(...page.assets);
      await page.write();
    }

    const assetMap = new Map();
    for (const asset of assets) {
      const key = `${asset.url}|${asset.dest}`;
      if (!assetMap.has(key)) {
        assetMap.set(key, asset);
      }
    }
    const uniqueAssets = Array.from(assetMap.values());

    createFile(this._state.configFile('assets.yml'), yaml.stringify(uniqueAssets));
  }
}

export { PartInterpreter };
