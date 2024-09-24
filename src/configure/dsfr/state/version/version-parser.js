import fs from 'fs';
import semver from 'semver';
import log from '../../../../utils/log.js';
import { VersionState } from '../../../../state/version/version-state.js';

class VersionParser extends VersionState{
  constructor () {
    super();
    this._isValid = false;
  }

  get isValid() {
    return this._isValid;
  }

  async load(src = '') {
    const pckSrc = `${src}/package.json`;
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
    this.parse(pck.version);
  }

  setAsCurrent () {
    const clone = this._clone();
    clone._isCurrent = true;
    Object.freeze(clone);
    return clone;
  }
}

export { VersionParser };
