import fs from 'fs';
import { spawnSync } from 'child_process';
import { VersionState } from '../dsfr/state/version/version-state.js';

class DocVersion {
  constructor (src) {
    this._src = src;
    this._isValid = false;
  }

  get src () {
    return this._src;
  }

  get isValid () {
    return this._isValid;
  }

  get state () {
    return this._state;
  }

  get id () {
    return this._state.id;
  }

  get isPrerelease () {
    return this._state.isPrerelease;
  }

  get feature () {
    return this._state.feature;
  }

  get isCurrent () {
    return this._isCurrent;
  }

  setAsCurrent () {
    this._isCurrent = true;
  }

  async read () {
    this._state = new VersionState();
    await this._state.load(this._src);
    this._isValid = this._state.isValid;
  }

  get data () {
    return {
      ...this._state.data,
      isCurrent: this._isCurrent
    };
  }

  async write (forced) {
    if (fs.existsSync(`${this._src}.dsfr/`) && !forced) return;
    const result = await spawnSync(`cd ${this._src} && yarn && yarn dsfr configure`, { shell: true });
    if (result.error) throw result.error;
    if (result.stdout) console.log(result.stdout.toString());
    if (result.stderr) console.log(result.stderr.toString());
  }
}

export { DocVersion };
