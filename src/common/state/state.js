import fs from 'fs';
import { VersionState } from './version/version-state.js';
import { I18nState } from './i18n/i18n-state.js';
import { MapState } from './map/map-state.js';
import yaml from 'yaml';
import { normalize } from '@gouvfr/dsfr-forge';
import { CONFIG_FOLDER } from '../constants.js';
import { fragments } from '@gouvfr/dsfr-lore';

class State {
  constructor () {
    this._src = null;
    this._root = null;
    this._dest = null;
    this._path = '/';
    this._config = CONFIG_FOLDER;
    this._part = null;
    this._i18n = null;
    this._version = null;
    this._map = null;
    this._partIds = [];
    this._initial = null;
    this._siblings = [];
  }

  async load () {
    const dataFile = fs.readFileSync(`${this._config}/state.yml`, 'utf8');
    const data = yaml.parse(dataFile);
    this._root = data.root;
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
    this._banner = `/*! DSFR ${this._version.tag} | SPDX-License-Identifier: MIT | License-Filename: LICENSE.md | restricted use (see terms and conditions) */`;
  }

  get src () {
    return this._src;
  }

  get root () {
    return this._root;
  }

  get dest () {
    return this._dest;
  }

  get path () {
    return this._path;
  }

  get part () {
    return this._part;
  }

  get config () {
    const vertical = this._part ? `/${this._part}` : '';
    return `${this._config}${vertical}`;
  }

  get deploy () {
    return {
      asset: `/${this.version.text}/asset`,
      static: '/static',
      lib: '/lib',
      dist: '/dist',
    }
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

  get banner () {
    return this._banner;
  }

  _clone () {
    const state = new this.constructor();
    state._src = this._src;
    state._root = this._root;
    state._dest = this._dest;
    state._path = this._path;
    state._config = this._config;
    state._part = this._part;
    state._i18n = this._i18n;
    state._version = this._version;
    state._map = this._map;
    state._partIds = this._partIds;
    state._banner = this._banner;
    state._initial = this._initial;
    state._siblings = this._siblings;
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

  setPart (part) {
    const state = this._clone();
    state._part = part;
    Object.freeze(state);
    return state;
  }

  setData (data) {
    const state = this._clone();
    if (data.src) state._src = data.src;
    if (data.dest) state._dest = data.dest;
    if (data.path) state._path = data.path;
    if (data.part) state._part = data.part;
    Object.freeze(state);
    return state;
  }

  srcFile (filename) {
    return `${this._src}/${filename}`;
  }

  destFile (filename) {
    return `${this._dest}/${filename}`;
  }

  configFile (filename) {
    return `${this.config}/${filename}`;
  }

  get urlset () {
    return this._map.getUrlset(this._i18n.default.code, this._i18n.locales.map(locale => locale.code));
  }

  resolveItems (path, rank = null, sort = null) {
    return this._map.getChildNodes(path, this._i18n.current.code, this._i18n.default.code, this._i18n.locales.map(locale => locale.code), this._version.text, rank, sort, this._src, this._path);
  }

  resolveItem (item) {
    if (item.path) {
      return {
        ...item,
        ...this._map.getNode(item.path, this._i18n.current.code, this._i18n.default.code, this._version.text, this._src, this._path)
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
    const relative = this._map.getRelativeNode(from, path, this._i18n.current.code, this._i18n.default.code, this.version.text, this._src)?.url;
    const anchor = regex[4] ? `#${normalize(regex[5])}` : '';
    return `${relative}${anchor}`;
  }

  getUrl (path, locale = null) {
    return this._map.getNode(path, locale?.code ?? this._i18n.current.code, this._i18n.default.code, this._version.text, this._src)?.url;
  }

  getFallbackUrl (path, locale = null) {
    const url = this.getUrl(path, locale);
    if (url) return url;
    const fallback = path.split('/').slice(0, -1).join('/');
    return this.getFallbackUrl(fallback, locale);
  }

  getVersionData (path, locale, active = false) {
    const data = {
      text: this._version.text,
      major: this._version.major,
      minor: this._version.minor,
      url: this.getFallbackUrl(path, locale),
      active: active
    };

    if (this._version.isCurrent) {
      data.badge = fragments.getFragment(locale.code, 'current.text');
    }

    return data;
  }

  getVersionsData (path) {
    const data = [ this.getVersionData(path, this._i18n.current, true) ];

    for (const sibling of this._siblings) {
      data.push(sibling.getVersionData(path, this._i18n.current));
    }

    data.sort((a, b) => {
      return (b.major - a.major) * 1000 + (b.minor - a.minor);
    })

    return data;
  }
}

const getState = async (options = {}, StateConstructor = State) => {
  const state = new StateConstructor();
  state._src = options.src ?? '.';
  state._root = options.root ?? '.';
  state._dest = options.dest ?? '.';
  state._config = options.config ?? CONFIG_FOLDER;
  await state.load();
  return state;
};

const getStates = async (options = {}, StateConstructor = State) => {
  const dirs = fs.readdirSync(CONFIG_FOLDER, { withFileTypes: true })
    .filter(dir => dir.isDirectory() && fs.existsSync(`${CONFIG_FOLDER}/${dir.name}/state.yml`))
    .map(dir => dir.name);
  const states = [];
  for (const dir of dirs) {
    const state = await getState({ ...options, config: `${CONFIG_FOLDER}/${dir}` }, StateConstructor);
    states.push(state);
  }
  for (const state of states) {
    state._siblings = states.filter(sibling => sibling !== state);
  }
  return states;
}

export { State, getState, getStates };
