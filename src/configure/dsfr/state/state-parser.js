import { I18nParser } from './i18n/i18n-parser.js';
import { VersionParser } from './version/version-parser.js';
import { createFile, getPackagePath } from '@gouvfr/dsfr-forge';
import { State } from '../../../common/state/state.js';
import yaml from 'yaml';
import { ResourceParser } from './resource/resource-parser.js';
import { fragments } from '@gouvfr/dsfr-lore'
import { CONFIG_FOLDER, GITHUB_EDIT } from '../../../common/constants.js';
import path from 'path';

const STATIC_SRC = `${getPackagePath('@gouvfr/dsfr-lore')}src`;

class StateParser extends State {
  constructor () {
    super();
    this._isStatic = false;
  }

  async load () {
    this._i18n = new I18nParser();
    await this._i18n.load(this._src);
    this._version = new VersionParser();
    await this._version.load(this._root);
    this._resource = new ResourceParser();
    await this._resource.load(`${STATIC_SRC}/resource`, this._version.core, this._i18n.locales);
    this._config = `${CONFIG_FOLDER}/${this._version.feature}`
    this._apply();
  }

  _clone () {
    const state = super._clone();
    state._resource = this._resource;
    state._isStatic = this._isStatic;
    return state;
  }

  statify (id) {
    const state = this._clone();
    state._src = `${STATIC_SRC}/parts/${id}`;
    state._isStatic = true;
    Object.freeze(state);
    return state;
  }

  get editUrl () {
    return this._isStatic || !this._version.isCurrent ? null : path.join(GITHUB_EDIT, this._src);
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

  get versionSegment () {
    if (this._version.isCurrent) return fragments.getFragment(this._i18n.current.code, 'current.segment');
    return this.version.text;
  }

  async write (map, partIds) {
    const data = {
      root: this._root,
      i18n: this._i18n.data,
      version: this._version.data,
      map: {
        [this.version.text]: map
      },
      partIds: partIds
    }

    createFile(`${this.config}/state.yml`, yaml.stringify(data));
  }
}

export { StateParser };
