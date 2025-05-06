import { fragments } from '@gouvfr/dsfr-lore';
import { RedirectionType } from '@gouvfr/dsfr-roller'
import { createFile } from '@gouvfr/dsfr-forge'
import yaml from 'yaml'

class RedirectionParser {
  constructor (state, map) {
    this._state = state;
    this._locales = this._state.i18n.locales.map(locale => locale.code);
    this._urls = new Map(this._locales.map(locale => [locale, map[locale].url]));
  }

  async read () {
    const localesData = this._locales.map(locale => {
      const code = locale;
      const url = this._urls.get(code);
      const title = fragments.getFragment(locale, 'redirect.title');
      const text = fragments.getFragment(locale, 'redirect.text').replace(/\[(\w+)\]\(%s\)/g, `<a href="${url}">$1</a>`);
      const current = fragments.getFragment(locale, 'current.segment');
      return { code, title, text, current, url };
    });
    const defaultLocaleData = localesData.find(localeData => localeData.code === this._state.i18n.default.code);
    const versionText = this._state.version.text;

    this._redirections = [];

    if (this._state.version.isCurrent) {
      this._redirections.push(
        ...localesData
          .map(localeData => this._getRedirectionData(RedirectionType.META, localeData, `${localeData.current}/index.html`))
      );
      this._redirections.push(this._getRedirectionData(RedirectionType.SCRIPT, defaultLocaleData, 'index.html', this._locales, this._urls));
    }
    else {
      this._redirections.push(this._getRedirectionData(RedirectionType.SCRIPT, defaultLocaleData, `${versionText}/index.html`, this._locales, this._urls));
    }
  }

  _getRedirectionData (type, contentData, dest, locales = null, urls = null) {

    const data = {
      type: type,
      code: contentData.code,
      title: contentData.title,
      text: contentData.text,
      url: contentData.url,
      dest: dest
    };

    switch (type) {
      case RedirectionType.META:
        break;

      case RedirectionType.SCRIPT:
        data.locales = locales;
        data.urls = urls;
        break;

      default:
        throw new Error(`Unknown redirection type: ${type}`);
    }

    return data;
  }

  async write () {
    createFile(this._state.configFile('redirect.yml'), yaml.stringify(this._redirections));
  }
}

export { RedirectionParser };
