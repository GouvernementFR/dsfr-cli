import fs from 'fs';
import { copyDir, deleteDir } from '@gouvfr/dsfr-forge';
import { DIST } from '../../../common/constants.js';
import { Bundler } from '@gouvfr/dsfr-roller'

class BundlePublisher {
  constructor (dest, env) {
    this._dest = dest;
    this._bundler = new Bundler(dest, env);
  }

  async clean () {
    deleteDir(this._dest);
  }

  async copy (context) {
    if (!fs.existsSync(`${this._dest}/dist`)) await copyDir(DIST, `${this._dest}/dist`);
    await this._bundler.copy(context);
  }

  async compile () {
    await this._bundler.compile();
  }
}

export { BundlePublisher };
