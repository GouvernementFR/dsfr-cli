import { PartParser } from './part/part-parser.js';
import { deleteDir } from '@gouvfr/dsfr-cli-utils';
import { StateParser } from './state/state-parser.js';
import { getState } from '../../state/state.js';
import { CONFIG_DIR } from '../../constants.js';
import { spawnSync } from 'child_process';
class DSFRConfigurator {
  async configure (settings) {
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
}

export { DSFRConfigurator };
