import { PartReader } from './part/part-reader.js';
import { deleteDir } from '../../utilities/file.js';
import { State } from './state/state.js';
class DSFRConfigurator {
  async configure (settings) {
    const state = await State.getInitialState('src/dsfr', '.dsfr');
    deleteDir(state.dest);
    this._rootPart = new PartReader(state, null);
    await this._rootPart.read();


    await this._rootPart.write();

    await state.write();
  }

  get part () {
    return this._rootPart;
  }
}

export { DSFRConfigurator };
