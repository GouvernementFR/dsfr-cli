import { PartReader } from './part/part-reader.js';
import { deleteDir } from '../../utilities/file.js';
import { DocReader } from './doc/doc-reader.js';
import { State } from './state/state.js';
class DSFRConfigurator {
  async configure (settings) {
    this._state = await State.getInitialState('src', '.dsfr', (id) => this.part.getPart(id));

    await this._configureParts();
    await this._configureDocs();

    await this._state.write();
  }

  async _configureParts () {
    const state = this._state.descend('dsfr', 'parts');
    deleteDir(state.dest);
    this._rootPart = new PartReader(state, null);
    await this._rootPart.read();
    await this._rootPart.write();
  }

  async _configureDocs () {
    const state = this._state.descend('doc/content', 'pages');
    deleteDir(state.dest);
    this._rootDoc = new DocReader(state, null);
    await this._rootDoc.read();
    await this._rootDoc.write();
  }

  get part () {
    return this._rootPart;
  }
}

export { DSFRConfigurator };
