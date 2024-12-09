import { I18nLocale } from '../../../../state/i18n/i18n-locale.js';
import fs from 'fs';
import yaml from 'yaml';
import { log } from '@gouvfr/dsfr-cli-utils';
import { I18nState } from '../../../../state/i18n/i18n-state.js';

class I18nParser extends I18nState {
  async load (src) {
    const fileSrc = `${src}/i18n.yml`;
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
    this.freeze();
  }
}

export { I18nParser };
