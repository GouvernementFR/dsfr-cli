import { PartParser } from './part/part-parser.js';
import { deleteDir } from '@gouvfr/dsfr-forge';
import { StateParser } from './state/state-parser.js';
import { getState } from '../../common/state/state.js';
import { RedirectionParser } from './redirect/redirection-parser.js'
import { ChangelogParser } from './changelog/changelog-parser.js';

class DsfrConfigurator {
  constructor (root = '.') {
    this._root = root;
    this._src = root + '/src/dsfr';
  }

  async configure (settings) {
    const state = await this.getState(settings.isCurrent !== false);
    deleteDir(state.config);
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
  }

  async getState (isCurrent) {
    const state = await getState({ src: this._src, root: this._root, dest: '.'}, StateParser);
    if (isCurrent) return state.setAsCurrent();
    return state;
  }
}

export { DsfrConfigurator };
