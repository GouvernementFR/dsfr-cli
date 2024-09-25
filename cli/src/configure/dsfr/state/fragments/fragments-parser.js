import fs from 'fs';
import yaml from 'yaml';

class FragmentsParser {
  async load (file, locales) {
    const fragmentsData = fs.readFileSync(file, 'utf8');
    const fragments = yaml.parse(fragmentsData);
    this._fragments = {};
    for (const locale of locales) {
      this._fragments[locale.code] = this._normalize(fragments, locale);
    }
    Object.freeze(this._fragments);
  }

  _normalize (fragments, locale) {
    const normalized = {};
    for (const key in fragments) {
      if (typeof fragments[key] === 'object') normalized[key] = this._normalize(fragments[key], locale);
      else if (key === locale.code) return fragments[key];
    }
    return normalized;
  }

  getFragments (locale) {
    return this._fragments[locale.code];
  }
}

export { FragmentsParser };
