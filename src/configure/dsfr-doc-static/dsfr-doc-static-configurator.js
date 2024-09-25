import { deleteDir } from '../../utils/file.js';
import { getState } from '../../state/state.js';
class DsfrDocStaticConfigurator {
  async configure (settings) {
    /*
    const state = await getState('src/dsfr', '.dsfr', StateParser);
    deleteDir(state.dest);
    this._rootPart = new PartParser(state, null);
    await this._rootPart.read();


    await this._rootPart.write();

    const partIds = this._rootPart.descendants.map(part => part.id);
    partIds.unshift(this._rootPart.id);

    await state.write(this._rootPart.map, partIds);

     */
  }
}

export { DsfrDocStaticConfigurator };
