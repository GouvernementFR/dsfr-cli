import fs from 'fs';
import yaml from 'yaml';
import { PagePublisher } from './page/page-publisher.js';
import { copyFile } from '@gouvfr/dsfr-forge';
import { DocumentCollection } from '../integration/search/document-collection.js'

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

  get collections () {
    return this._collections;
  }

  async read () {
    const assetFile = fs.readFileSync(this._state.configFile('assets.yml'), 'utf8');
    this._assets = yaml.parse(assetFile);

    this._assets.forEach(asset => {
      copyFile(asset.src, asset.dest);
    });

    const dataFile = fs.readFileSync(this._state.configFile('data.yml'), 'utf8');
    this._data = yaml.parse(dataFile);

    this._pages = [];
    this._collections = [];

    for (const locale of this._state.i18n.locales) {
      const localState = this._state.localize(locale);
      const filenames = this._data?.doc?.pages?.[locale.code];
      const collection = new DocumentCollection(locale);
      this._collections.push(collection);
      if (!filenames) continue;
      for (const filename of filenames) {
        const page = new PagePublisher(localState, filename);
        await page.read();
        collection.add(page.document);
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
