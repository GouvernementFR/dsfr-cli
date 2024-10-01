import { I18nParser } from './i18n/i18n-parser.js';
import { VersionParser } from './version/version-parser.js';
import { createFile, getPackagePath } from '@gouvfr/dsfr-cli-utils';
import { State } from '../../../state/state.js';
import yaml from 'yaml';
import { CONFIG_DIR } from '../../../constants.js';
import { ResourceParser } from './resource/resource-parser.js';
import { FragmentsParser } from './fragments/fragments-parser.js';

const STATIC_SRC = `${getPackagePath('@gouvfr/dsfr-doc-static')}src`;

class StateParser extends State {
  async load () {
    this._i18n = new I18nParser();
    await this._i18n.load(this._src);
    this._version = new VersionParser();
    await this._version.load('.');
    this._resource = new ResourceParser();
    await this._resource.load(`${STATIC_SRC}/resource`, this._version.core, this._i18n.locales);
    this._fragments = new FragmentsParser();
    await this._fragments.load(`${STATIC_SRC}/fragments.yml`, this._i18n.locales);
    this._apply();
  }

  _clone () {
    const state = super._clone();
    state._resource = this._resource;
    state._fragments = this._fragments;
    return state;
  }

  statify (id) {
    const state = this._clone();
    state._src = `${STATIC_SRC}/parts/${id}`;
    Object.freeze(state);
    return state;
  }

  setAsCurrent () {
    const clone = this._clone();
    clone._version = this._version.setAsCurrent();
    Object.freeze(clone);
    return clone;
  }

  getResource () {
    return this._resource.getResource(this._i18n.current);
  }

  getFragments () {
    return this._fragments.getFragments(this._i18n.current);
  }

  get versionSegment () {
    if (this._version.isCurrent) return this._fragments.getFragments(this._i18n.current).current.segment;
    return this.versionLabel;
  }

  get versionLabel () {
    return `v${this._version.feature}`;
  }

  async write (map, partIds) {
    const data = {
      i18n: this._i18n.data,
      version: this._version.data,
      map: {
        [this._version.feature]: map
      },
      partIds: partIds
    }

    createFile(`${CONFIG_DIR}/state.yml`, yaml.stringify(data));
  }
}

export { StateParser };
