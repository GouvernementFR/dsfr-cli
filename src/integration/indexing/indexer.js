import { Sitemap } from './sitemap.js';
import { createFile } from '@gouvfr/dsfr-forge';
import { DOMAIN } from '../../constants.js';

class Indexer {
  constructor (urlSet, dest) {
    this._urlSet = urlSet;
    this._dest = dest;
  }

  async write () {
    const sitemap = new Sitemap(this._urlSet);
    await sitemap.generate();

    createFile( `${this._dest}/sitemap.txt`, sitemap.text);
    createFile( `${this._dest}/sitemap.xml`, sitemap.xml);

    const robots = `Sitemap: ${DOMAIN}/sitemap.xml`;
    createFile( `${this._dest}/robots.txt`, robots);
  }
}

export { Indexer };
