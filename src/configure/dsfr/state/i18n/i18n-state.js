import { I18nLocale } from './i18n-locale.js';
import fs from 'fs';
import yaml from 'yaml';
import log from '../../../../utilities/log.js';

class I18nState {
  constructor (state) {
    this._state = state;
    this._default = null;
    this._current = null;
    this._locales = [];
    this._alts = [];
  }

  async load () {
    const fileSrc = `${this._state.src}i18n.yml`;
    if (!fs.existsSync(fileSrc)) {
      log.error(`i18n configuration file not found @ '${fileSrc}'`);
      return;
    }
    const fileContents = fs.readFileSync(fileSrc, 'utf8');
    const data = yaml.parse(fileContents);

    this._locales = data.map(localeData => new I18nLocale(localeData));
    this._default = this._locales.find(locale => locale.isDefault);
    this._alts = this._locales.filter(locale => !locale.isDefault);

    this._locales.forEach(locale => locale.parse(this._locales));
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
      'default': this._default.data,
      alts: this._alts.map(locale => locale.data)
    };
  }

  localize (locale) {
    this._current = this._locales.find(l => l.code === locale);
    if (!this._current) {
      log.error(`Locale not found @ '${locale}'`);
    }
  }
}

export { I18nState };
