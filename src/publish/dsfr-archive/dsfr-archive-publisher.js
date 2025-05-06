import { DsfrPublisher } from '../dsfr/dsfr-publisher.js';

class DsfrArchivePublisher {
  async publish (settings) {
    const publisher = new DsfrPublisher();
    await publisher.publish({ ...settings, context: 'archive' });
  }
}

export { DsfrArchivePublisher };
