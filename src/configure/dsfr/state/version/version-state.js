import fs from 'fs';
import semver from 'semver';
import log from '../../../../utilities/log.js';

class VersionState {
  constructor () {
    this._isValid = false;
  }

  get id() {
    return this._id;
  }

  get isPrerelease() {
    return this._isPrerelease;
  }

  get major() {
    return this._major;
  }

  get minor() {
    return this._minor;
  }

  get patch() {
    return this._patch;
  }

  get feature() {
    return this._feature;
  }

  get isValid() {
    return this._isValid;
  }

  async load(src = '') {
    const pckSrc = `${src}package.json`;
    if (!fs.existsSync(pckSrc)) {
      log.warn(`Missing "package.json" @ '${src}'`);
      return;
    }
    const pckFile = fs.readFileSync(pckSrc, 'utf8');
    const pck = JSON.parse(pckFile);
    if (pck.name !== '@gouvfr/dsfr') {
      throw new Error(`Invalid package name '${pck.name}' @ '${pckSrc}'`);
    }
    this._isValid = true;
    this._id = pck.version;
    this._isPrerelease = semver.prerelease(pck.version) !== null;
    this._major = semver.major(pck.version);
    this._minor = semver.minor(pck.version);
    this._patch = semver.patch(pck.version);
    this._feature = `${this._major}.${this._minor}`;
    Object.freeze(this);
  }

  get data() {
    return {
      id: this._id,
      isPrerelease: this._isPrerelease,
      major: this._major,
      minor: this._minor,
      patch: this._patch,
      feature: this._feature
    };
  }
}

export { VersionState };
