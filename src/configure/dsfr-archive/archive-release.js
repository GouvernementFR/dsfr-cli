import fs from 'fs';
import { spawnSync } from 'child_process';
import { VersionParser } from '../dsfr/state/version/version-parser.js';
import { DsfrConfigurator } from '../dsfr/dsfr-configurator.js';

class ArchiveRelease {
  constructor (src) {
    this._src = src;
    this._isValid = false;
    this._isCurrent = false;
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
    this._isValid = true;
    this._parser = new VersionParser();
    await this._parser.load(this._src);

    if (!this._parser.isValid) {
      this._isValid = false;
      return;
    }
    const src = `${this._src}/src/dsfr`;
    if (!fs.existsSync(src)) {
      this._isValid = false;
      return;
    }
    this._configurator = new DsfrConfigurator(this._src);
  }

  get data () {
    return {
      ...this._parser.data,
      isCurrent: this._isCurrent,
      isLatest: this._isLatest,
      src: this._src
    };
  }

  async write () {
    await this._configurator.configure({ isCurrent: this._isCurrent });
  }
}

export { ArchiveRelease };
