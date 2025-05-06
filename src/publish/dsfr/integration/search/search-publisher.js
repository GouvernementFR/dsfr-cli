import { DocumentCollection } from './document-collection.js';
import MiniSearch from 'minisearch';
import { createFile } from '@gouvfr/dsfr-forge';

class SearchPublisher {
  constructor (state) {
    this._state = state;
    this._locales = state.i18n.locales;
    this._collections = new Map();
    for (const locale of this._locales) this._collections.set(locale.code, new DocumentCollection(locale));
  }

  add (collections) {
    for (const collection of collections) {
      const locale = collection.locale;
      this._collections.get(locale.code).add(...collection.documents);
    }
  }

  async write () {
    for (const collection of this._collections.values()) {
      collection.index();
      await this.createIndex(
        collection.documents,
        this._state.getUrl('', collection.locale),
        { fields: ['title', 'keywords', 'summary', 'text'], storeFields: ['title', 'url', 'boost'] }
      );
      await this.createIndex(
        collection.documents,
        this._state.getUrl('search', collection.locale),
        { fields: ['title', 'keywords', 'summary', 'text'], storeFields: ['title', 'excerpt', 'cover', 'section', 'url', 'boost'] }
      );
    }
  }

  async createIndex (documents, dest, options) {
    const miniSearch = new MiniSearch(options);
    miniSearch.addAll(documents);
    createFile(`${this._state.dest}${dest}/index.json`, JSON.stringify(miniSearch.toJSON()));
  }
}

export { SearchPublisher };
