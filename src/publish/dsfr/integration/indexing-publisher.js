import { Indexer } from '@gouvfr/dsfr-roller';

class IndexingPublisher {
  constructor (state) {
    this._state = state;
  }

  async write () {
    const urlSet = this._state.urlset;
    const indexer = new Indexer(urlSet, this._state.dest);
    await indexer.write();
  }
}

export { IndexingPublisher };
