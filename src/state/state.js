import fs from 'fs';
import { VersionState } from './version/version-state.js';
import { I18nState } from './i18n/i18n-state.js';
import { MapState } from './map/map-state.js';
import yaml from 'yaml';
import { normalize } from '@gouvfr/dsfr-cli-utils';

class State {
  constructor () {
    this._src = null;
    this._dest = null;
    this._path = '/';
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
    this._apply();
    this._initial = this;
  }

  _apply () {
    this._banner = `/*! DSFR v${this._version.id} | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */`;
  }

  get src () {
    return this._src;
  }

  get dest () {
    return this._dest;
  }

  get path () {
    return this._path;
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

  get asset () {
    return this._asset;
  }

  get banner () {
    return this._banner;
  }

  _clone () {
    const state = new this.constructor();
    state._src = this._src;
    state._dest = this._dest;
    state._path = this._path;
    state._i18n = this._i18n;
    state._version = this._version;
    state._map = this._map;
    state._partIds = this._partIds;
    state._banner = this._banner;
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

  setPath (path) {
    const state = this._clone();
    state._path = path;
    Object.freeze(state);
    return state;
  }

  setPaths (src = null, dest = null, path = null) {
    const state = this._clone();
    if (src) state._src = src;
    if (dest) state._dest = dest;
    if (path) state._path = path;
    Object.freeze(state);
    return state;
  }

  srcFile (filename) {
    return `${this._src}/${filename}`;
  }

  destFile (filename) {
    return `${this._dest}/${filename}`;
  }

  resolveItems (path, kind = null) {
    return this._map.getChildNodes(path, this._i18n.current.code, this._i18n.default.code, this._i18n.locales.map(locale => locale.code), this._version.label, kind, this._src, this._path);
  }

  resolveItem (item) {
    if (item.path) {
      return {
        ...item,
        ...this._map.getNode(item.path, this._i18n.current.code, this._i18n.default.code, this._version.label, this._src, this._path)
      }
    }

    if (item.url) {
      return {
        ...item,
        url: this.resolveFrom(item.url),
      };
    }

    return item;
  }

  resolve (url) {
    return this.resolveFrom(url, this._path);
  }

  resolveFrom (url, from = '/') {
    if (/^(https:|http:|www\.)\S*$/.test(url)) return url;
    if (/^#.*/.test(url)) return `#${normalize(url)}`;

    const regex = /(.*)(\/)?index(@[a-z]{2})?\.md(#)?(.*)?$/.exec(url);
    if (!regex) return url;
    const path = regex[1];
    if (typeof path !== 'string') return url;
    const relative = this._map.getRelativeNode(from, path, this._i18n.current.code, this._i18n.default.code, this.version.label, this._src)?.url;
    const anchor = regex[4] ? `#${normalize(regex[5])}` : '';
    return `${relative}${anchor}`;
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
