import fs from 'fs';
import { VersionState } from './version/version-state.js';
import { I18nState } from './i18n/i18n-state.js';
import { MapState } from './map/map-state.js';
import yaml from 'yaml';

class State {
  constructor () {
    this._src = null;
    this._dest = null;
    this._i18n = null;
    this._version = null;
    this._map = null;
    this._partIds = [];
    this._initial = null;
  }

  async load () {
    const dataFile = fs.readFileSync(`${this._src}/state.yml`, 'utf8');
    const data = yaml.parse(dataFile);
    this._i18n = new I18nState();
    this._i18n.fill(data.i18n);
    this._version = new VersionState();
    this._version.fill(data.version);
    this._map = new MapState(data.map);
    this._partIds = data.partIds;
    Object.freeze(this._partIds);
    this._initial = this;
  }

  get src() {
    return this._src;
  }

  get dest() {
    return this._dest;
  }

  get i18n () {
    return this._i18n;
  }

  get version () {
    return this._version;
  }

  get map () {
    return this._map;
  }

  get partIds () {
    return this._partIds;
  }

  _clone () {
    const state = new this.constructor();
    state._src = this._src;
    state._dest = this._dest;
    state._i18n = this._i18n;
    state._version = this._version;
    state._map = this._map;
    state._initial = this._initial;
    return state;
  }

  clone () {
    const state = this._clone();
    Object.freeze(state);
    return state;
  }

  descend (src, dest = null) {
    const state = this._clone();
    state._src = `${this._src}/${src}`;
    if (dest) state._dest = `${this._dest}/${dest}`;
    Object.freeze(state);
    return state;
  }

  localize (locale = null, src = null) {
    const state = this._clone();
    if (locale) state._i18n = this._i18n.localize(locale);
    if (src) state._src = `${this._src}/${src}`;
    Object.freeze(state);
    return state;
  }

  setSrc (src) {
    const state = this._clone();
    state._src = src;
    Object.freeze(state);
    return state;
  }

  setDest (dest) {
    const state = this._clone();
    state._dest = dest;
    Object.freeze(state);
    return state;
  }

  srcFile (filename) {
    return `${this._src}/${filename}`;
  }

  destFile (filename) {
    return `${this._dest}/${filename}`;
  }

  getRelativeUrl (from, to) {
    return this._map.getRelativeUrl(from, to, this._i18n.current.code, this._i18n.default.code, this._version.feature);
  }
}

const getState = async (options, StateConstructor = State) => {
  const state = new StateConstructor();
  state._src = options.src;
  state._dest = options.dest;
  await state.load();
  return state;
};

export { State, getState };
