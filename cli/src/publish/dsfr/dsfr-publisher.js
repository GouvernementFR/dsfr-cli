import { getState } from '../../state/state.js';
import { PartPublisher } from './part/part-publisher.js';
import fs from 'fs';
import { CONFIG_DIR, DEPLOY_DIR } from '../../constants.js';
import { copyDir, deleteDir } from '../../utils/file.js';
import { getPackagePath } from '../../utils/package-path.js';
import { ScriptCompiler } from '@gouvfr/dsfr-compiler';

const DIST = `${getPackagePath('@gouvfr/dsfr#publisher')}dist`;
const PUBLISHER = getPackagePath('@gouvfr/dsfr-publisher');

class DSFRPublisher {
  async publish (settings) {
    if (settings.clean) await this.clean();

    await this.integrate();

    await this.compile();

    const state = await getState({ src: CONFIG_DIR, dest: DEPLOY_DIR });
    const partIds = settings.partIds ? state.partIds.filter(id => settings.partIds.includes(id)) : state.partIds;

    this._parts = [];

    for (const id of partIds) {
      const partState = state.descend(id);
      const part = new PartPublisher(partState);
      this._parts.push(part);
      await part.read();
    }

    for (const part of this._parts) {
      await part.write();
    }
  }

  async clean () {
    deleteDir(DEPLOY_DIR);
  }

  async integrate () {
    if (fs.existsSync(`${DEPLOY_DIR}/dist`)) return;
    await copyDir(DIST, `${DEPLOY_DIR}/dist`);
  }

  async compile () {
    const scriptCompiler = new ScriptCompiler();
    await scriptCompiler.compile(`${PUBLISHER}/src/script/index.js`, `${DEPLOY_DIR}/lib`, 'dsfr-doc');
  }
}

export { DSFRPublisher };
