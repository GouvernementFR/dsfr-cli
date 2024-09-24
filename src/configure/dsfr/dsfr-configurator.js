import { PartParser } from './part/part-parser.js';
import { deleteDir } from '../../utils/file.js';
import { StateParser } from './state/state-parser.js';
import { getState } from '../../state/state.js';
import { CONFIG_DIR } from '../../constants.js';
import { spawnSync } from 'child_process';
class DSFRConfigurator {
  async configure (settings) {
    await this.upgrade();

    const state = await this.getState(settings.isCurrent !== false);
    deleteDir(CONFIG_DIR);
    this._rootPart = new PartParser(state, null);
    await this._rootPart.read();

    await this._rootPart.write();

    const partIds = this._rootPart.descendants.map(part => part.id);
    partIds.unshift(this._rootPart.id);

    await state.write(this._rootPart.map, partIds);
  }

  async getState (isCurrent) {
    const state = await getState({ src: 'src/dsfr', dest: ''}, StateParser);
    if (isCurrent) return state.setAsCurrent();
    return state;
  }

  async upgrade () {
    /*
    const result = await spawnSync(`yarn up @gouvfr/dsfr-doc-static`, { shell: true });
    if (result.error) throw result.error;
    if (result.stdout) console.log(result.stdout.toString());
    if (result.stderr) console.log(result.stderr.toString());
     */
  }
}

export { DSFRConfigurator };
