import fs from 'fs';
import { ExportParser } from './part/export-parser.js';
import { getState } from '../../common/state/state.js';
import path from 'path';

class DsfrCurator {
  async curate (settings) {
    const state = (await getState()).setSrc(path.resolve(settings.src));

    const parser = new ExportParser(state);
    await parser.read();
    await parser.write();

    /*
    const state = await this.getState(settings.isCurrent !== false);
    deleteDir(CONFIG_DIR);
    this._rootPart = new PartParser(state, null);

    await this._rootPart.read();
    await this._rootPart.write();

    const partIds = this._rootPart.descendants.map(part => part.id);
    partIds.unshift(this._rootPart.id);

    await state.write(this._rootPart.map, partIds);

    const redirectionParser = new RedirectionParser(state, this._rootPart.map);
    await redirectionParser.read();
    await redirectionParser.write();

    const changelogParser = new ChangelogParser(state, partIds);
    await changelogParser.read();
    await changelogParser.write();

     */
  }

  async getState (isCurrent) {
    /*
    const state = await getState({ src: 'src/dsfr', dest: '.'}, StateParser);
    if (isCurrent) return state.setAsCurrent();
    return state;

     */
  }
}

export { DsfrCurator };
