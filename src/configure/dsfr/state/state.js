import { I18nState } from './i18n/i18n-state.js';
import { VersionState } from './version/version-state.js';
import { createFile } from '../../../utilities/file.js';
import yaml from 'yaml';

class State {
  static async getInitialState (src, dest) {
    const state = new State();
    state._src = `${src}/`;
    state._dest = `${dest}/`;
    state._i18n = new I18nState();
    await state._i18n.load(state.src);
    state._version = new VersionState();
    await state._version.load();
    state._initial = state;
    Object.freeze(state);
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

  clone () {
    const state = new State();
    state._src = this._src;
    state._dest = this._dest;
    state._i18n = this._i18n;
    state._version = this._version;
    state._initial = this._initial;
    return state;
  }

  descend (src, dest = null) {
    const state = this.clone();
    state._src = `${this._src}${src}/`;
    if (dest) state._dest = `${this._dest}${dest}/`;
    Object.freeze(state);
    return state;
  }

  localize (locale = null, fallback = false) {
    const state = this.clone();
    if (locale) state._i18n = this._i18n.localize(locale);
    const suffix = locale === null || fallback ? '' : `@${state._i18n.current.code}`;
    state._src = `${this._src}index${suffix}.md`;
    Object.freeze(state);
    return state;
  }

  async write () {
    const data = {
      i18n: this._i18n.data,
      version: this._version.data
    }

    createFile(`${this._dest}state.yml`, yaml.stringify(data));
  }


}

export { State };
