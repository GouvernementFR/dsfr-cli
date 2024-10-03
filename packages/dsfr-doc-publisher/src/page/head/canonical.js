import { CONFIG } from '../../config.js';

class Canonical {
  constructor (url, alts) {
    const links = [`<link rel="canonical" href="${CONFIG.DOMAIN}${url}">`];

    for (const alt of alts) {
      links.push(`<link rel="alternate" href="${CONFIG.DOMAIN}${alt.href}" hreflang="${alt.lang}">`);
    }

    this._html = links.join('\n');
  }
  get html () {
    return this._html;
  }
}

export { Canonical };
