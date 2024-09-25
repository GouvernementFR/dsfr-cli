import fs from 'fs';
import { spawnSync } from 'child_process';
import { VersionParser } from '../dsfr/state/version/version-parser.js';

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

  get parser () {
    return this._parser;
  }

  get id () {
    return this._parser.id;
  }

  get isPrerelease () {
    return this._parser.isPrerelease;
  }

  get major () {
    return this._parser.major;
  }

  get feature () {
    return this._parser.feature;
  }

  get isCurrent () {
    return this._isCurrent;
  }

  setAsCurrent () {
    this._isCurrent = true;
  }

  setAsLatest () {
    this._isLatest = true;
  }

  async read () {
    this._parser = new VersionParser();
    await this._parser.load(this._src);
    this._isValid = this._parser.isValid;
  }

  get data () {
    return {
      ...this._parser.data,
      isCurrent: this._isCurrent,
      isLatest: this._isLatest,
      src: this._src
    };
  }

  async write (forced, current = null) {
    if (fs.existsSync(`${this._src}/.dsfr`) && !forced) return;
    const result = await spawnSync(`cd ${this._src} && yarn && yarn dsfr configure -c ${this._isCurrent}`, { shell: true });
    if (result.error) throw result.error;
    if (result.stdout) console.log(result.stdout.toString());
    if (result.stderr) console.log(result.stderr.toString());
  }
}

export { DocVersion };
