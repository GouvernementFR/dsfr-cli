import fs from 'fs';
import { log } from '@gouvfr/dsfr-forge';
import { DsfrPublisher } from './dsfr/dsfr-publisher.js';
import { DsfrArchivePublisher } from './dsfr-archive/dsfr-archive-publisher.js';

class Publication {
  async publish (settings) {
    log.section('Publication');

    const publication = await this.getPublication();
    await publication.publish(settings);
  }

  async getPublication () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile.toString('utf-8'));

    log.info(`package ${pck.name}`);

    switch (pck.name) {
      case '@gouvfr/dsfr':
        return new DsfrPublisher();

      case '@gouvfr/dsfr-archive':
        return new DsfrArchivePublisher();

      default:
        throw new Error(`No publisher found for ${pck.name}`);
    }
  }
}

export { Publication };
