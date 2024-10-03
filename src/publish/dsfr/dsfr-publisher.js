import { getState } from '../../state/state.js';
import { PartPublisher } from './part/part-publisher.js';
import { CONFIG_DIR, DEPLOY_DIR } from '../../constants.js';
import { Integration } from './integration/integration.js';

class DSFRPublisher {
  async publish (settings) {
    await Integration.integrate(settings.clean, true, true);

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
}

export { DSFRPublisher };
