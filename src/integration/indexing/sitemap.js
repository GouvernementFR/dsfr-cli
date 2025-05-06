import { DOMAIN } from '../../constants.js';
import { formatHtml } from '../../core/format-html.js';

class Sitemap {
  constructor (urlSet) {
    this._urlSet = urlSet;
  }

  async generate () {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
    let text = '';

    for (const url of this._urlSet) {
      xml += '<url>\n';
      if (url.hasOwnProperty('loc')) {
        xml += `<loc>${DOMAIN}${url.loc}</loc>\n`;


        if (Array.isArray(url.alts)) {
          xml += url.alts.map(alt => `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${DOMAIN}${alt.url}"/>\n`).join('');
          text += url.alts.map(alt => `${DOMAIN}${alt.url}\n`).join('\n');
        }
        else {
          text += `${DOMAIN}${url.loc}\n`;
        }
      }
      xml += '</url>\n';
    }
    xml += '</urlset>';

    this._xml = await formatHtml(xml, 'sitemap');
    this._text = text;
  }

  get text () {
    return this._text;
  }

  get xml () {
    return this._xml;
  }
}

export { Sitemap };
