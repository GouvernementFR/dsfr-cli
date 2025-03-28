import { getPackagePath } from '@gouvfr/dsfr-forge';
import fs from 'fs'
import yaml from 'yaml'
const SRC = `${getPackagePath('@gouvfr/dsfr-lore')}src`;

class Fragments {
  constructor () {
    const fragmentsData = fs.readFileSync(`${SRC}/fragments/fragments.yml`, 'utf8');
    this._fragments = yaml.parse(fragmentsData);
    Object.freeze(this._fragments);
  }

  get data () {
    return this._fragments;
  }

  _normalize (fragments, locale) {
    const normalized = {};
    for (const key in fragments) {
      if (typeof fragments[key] === 'object') normalized[key] = this._normalize(fragments[key], locale);
      else if (key === locale) return fragments[key];
    }
    return normalized;
  }

  getFragments (locale) {
    const localisedFragments = {};
    for (const key in this._fragments) {
      localisedFragments[key] = this._normalize(this._fragments[key], locale);
    }
    return localisedFragments;
  }

  getFragment (locale, key) {
    const props = key.split('.');
    let fragment = this._fragments;
    for (const prop of props) {
      fragment = fragment[prop];
      if (!fragment) return null;
    }
    return fragment[locale];
  }
}

const fragments = new Fragments();

export { fragments };
