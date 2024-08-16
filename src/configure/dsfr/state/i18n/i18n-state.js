import { I18nLocale } from './i18n-locale.js';
import fs from 'fs';
import yaml from 'yaml';
import log from '../../../../utilities/log.js';

class I18nState {
  constructor () {
    this._default = null;
    this._current = null;
    this._locales = [];
    this._alts = [];
  }

  async load (src) {
    const fileSrc = `${src}i18n.yml`;
    if (!fs.existsSync(fileSrc)) {
      log.error(`i18n configuration file not found @ '${fileSrc}'`);
      return;
    }
    const fileContents = fs.readFileSync(fileSrc, 'utf8');
    const data = yaml.parse(fileContents);

    this._locales = data.map(localeData => new I18nLocale(localeData));
    this._default = this._locales.find(locale => locale.isDefault);
    this._current = this._default;
    this._alts = this._locales.filter(locale => !locale.isDefault);

    this._locales.forEach(locale => {
      locale.parse(this._locales);
      Object.freeze(locale);
    });
  }

  freeze () {
    Object.freeze(this._locales);
    Object.freeze(this._alts);
    Object.freeze(this);
  }

  get locales () {
    return this._locales;
  }

  get default () {
    return this._default;
  }

  get current () {
    return this._current;
  }

  get alts () {
    return this._alts;
  }

  get data () {
    return {
      default: this._default.data,
      alts: this._alts.map(locale => locale.data)
    };
  }

  clone () {
    const clone = new I18nState();
    clone._default = this._default;
    clone._current = this._current;
    clone._locales = this._locales
    clone._alts = this._alts;
    return clone;
  }

  localize (locale) {
    if (!this._locales.some(loc => loc.code === locale.code)) {
      log.error(`wrong Locale '${locale}'`);
    }
    const clone = this.clone();
    clone._current = locale;
    this.freeze();
    return clone;
  }
}

export { I18nState };
