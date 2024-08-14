import { I18nState } from './i18n/i18n-state.js';
import { VersionState } from './version/version-state.js';
import { createFile } from '../../../utilities/file.js';
import yaml from 'yaml';

class State {
  static async getInitialState (src, dest, getPart = null) {
    const state = new State();
    state._src = `${src}/`;
    state._dest = `${dest}/`;
    state._getPart = getPart;
    state._i18n = new I18nState(state);
    await state._i18n.load();
    state._version = new VersionState();
    await state._version.load();
    state._initial = state;
    return state;
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

  get part () {
    return this._part;
  }

  clone () {
    const state = new State();
    state._src = this._src;
    state._dest = this._dest;
    state._getPart = this._getPart;
    state._part = this._part;
    state._i18n = this._i18n;
    state._version = this._version;
    state._initial = this._initial;
    return state;
  }

  descend (src, dest = null) {
    const state = this.clone();
    state._src = `${this._src}${src}/`;
    if (dest !== null) state._dest = `${this._dest}${dest}/`;
    return state;
  }

  change (partId, doc) {
    const state = this.clone();
    state._part = this._getPart(partId);
    if (!state._part) {
      throw new Error(`no part corresponding to id : '${partId}' in state`);
    }
    state._part.linkDoc(doc);
    state._src = `${state._part.src}_part/doc/`;
    return state;
  }

  async write () {
    const data = {
      i18n: this._i18n.data,
      version: this._version.data
    }

    createFile(`${this._dest}data.yml`, yaml.stringify(data));
  }

  localize (locale) {
    const state = this.clone();
    state._i18n.localize(locale);
    return state;
  }
}

export { State };
