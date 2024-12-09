import fs from 'fs';
import yaml from 'yaml';
import { PagePublisher } from './page/page-publisher.js';
import { copyFile } from '@gouvfr/dsfr-cli-utils';

class PartPublisher {
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
    const assetFile = fs.readFileSync(`${this._state.src}/assets.yml`, 'utf8');
    this._assets = yaml.parse(assetFile);

    this._assets.forEach(asset => {
      copyFile(asset.src, asset.dest);
    });

    const dataFile = fs.readFileSync(`${this._state.src}/data.yml`, 'utf8');
    this._data = yaml.parse(dataFile);

    this._pages = [];

    for (const locale of this._state.i18n.locales) {
      const localState = this._state.localize(locale);
      const filenames = this._data?.doc?.pages?.[locale.code];
      if (!filenames) continue;
      for (const filename of filenames) {
        const state = localState.descend(`pages/${filename}`);
        const page = new PagePublisher(state);
        await page.read();
        this._pages.push(page);
      }
    }
  }

  async write () {
    for (const page of this._pages) {
      await page.write();
    }
  }
}

export { PartPublisher };
