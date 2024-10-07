import { CONFIG } from '../../config.js';
import { Renderable } from '../../core/renderable.js';

class Canonical extends Renderable {
  async render () {
    const links = [`<link rel="canonical" href="${CONFIG.DOMAIN}${this.data.url}">`];

    for (const alt of this.data.alts) {
      links.push(`<link rel="alternate" href="${CONFIG.DOMAIN}${alt.href}" hreflang="${alt.lang}">`);
    }

    return links.join('\n');
  }
}

export { Canonical };
