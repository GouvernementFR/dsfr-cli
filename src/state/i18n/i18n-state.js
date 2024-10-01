import { I18nLocale } from './i18n-locale.js';
import { log } from '@gouvfr/dsfr-cli-utils';

class I18nState {
  constructor () {
    this._default = null;
    this._current = null;
    this._locales = [];
    this._alts = [];
  }

  fill (data) {
    this._default = new I18nLocale(data.default, true);
    this._alts = data?.alts?.map(alt => new I18nLocale(alt)) ?? [];
    this._locales = [this._default, ...this._alts];
    this.freeze();
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

  get alts () {
    return this._alts;
  }

  get current () {
    return this._current;
  }

  get data () {
    return {
      default: this._default.data,
      alts: this._alts.map(locale => locale.data)
    };
  }

  clone () {
    const clone = this._clone();
    clone.freeze();
    return clone;
  }

  _clone () {
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
    const clone = this._clone();
    clone._current = locale;
    this.freeze();
    return clone;
  }
}

export { I18nState };
