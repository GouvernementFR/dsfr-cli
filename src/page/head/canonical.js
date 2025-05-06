import { DOMAIN } from '../../constants.js'
import { Renderable } from '../../core/renderable.js';

class Canonical extends Renderable {
  async render () {
    const links = [`<link rel="canonical" href="${DOMAIN}${this.data.url}">`];

    for (const alt of this.data.alts) {
      links.push(`<link rel="alternate" href="${DOMAIN}${alt.url}" hreflang="${alt.lang}">`);
    }

    return links.join('\n');
  }
}

export { Canonical };
