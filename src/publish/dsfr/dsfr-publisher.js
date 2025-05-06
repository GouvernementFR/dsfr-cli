import { getStates } from '../../common/state/state.js';
import { PartPublisher } from './part/part-publisher.js';
import { DEPLOY_FOLDER, ENV_FOLDER } from '../../common/constants.js';
import { BundlePublisher } from './integration/bundle-publisher.js';
import { StorybookPublisher } from './integration/storybook-publisher.js';
import { RedirectionPublisher } from './integration/redirection-publisher.js'
import { SearchPublisher } from './integration/search/search-publisher.js'
import { IndexingPublisher } from './integration/indexing-publisher.js';

class DsfrPublisher {
  async publish (settings) {
    if (!settings.bypass) {
      const bundlePublisher = new BundlePublisher(DEPLOY_FOLDER, ENV_FOLDER);
      await bundlePublisher.clean();
      await bundlePublisher.copy(settings.context);
      await bundlePublisher.compile();
    }

    const states = await getStates({ src: '.', dest: DEPLOY_FOLDER });

    for (const state of states) {
      await this._publish(settings, state);
    }
  }

  async _publish (settings, state) {
    if (!settings.bypass) {
      const redirectionPublisher = new RedirectionPublisher(state);
      await redirectionPublisher.read();
      await redirectionPublisher.write();

      const storybookPublisher = new StorybookPublisher(state);
      await storybookPublisher.copy();

      if (state.version.isCurrent) {
        const indexingPublisher = new IndexingPublisher(state);
        await indexingPublisher.write();
      }
    }

    const partIds = settings.partIds ? state.partIds.filter(id => settings.partIds.includes(id)) : state.partIds;

    this._parts = [];
    const searchPublisher = new SearchPublisher(state);

    for (const id of partIds) {
      const partState = state.setPart(id);
      const part = new PartPublisher(partState);
      this._parts.push(part);
      await part.read();
      searchPublisher.add(part.collections);
    }

    for (const part of this._parts) {
      await part.write();
    }

    if (!settings.bypass && !settings.partIds) {
      await searchPublisher.write();
    }
  }
}

export { DsfrPublisher };
