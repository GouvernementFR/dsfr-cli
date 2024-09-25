import fs from 'fs';
import log from '../utils/log.js';
import { DSFRPublisher } from './dsfr/dsfr-publisher.js';
import { DSFRDocPublisher } from './dsfr-doc/dsfr-doc-publisher.js';

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
        return new DSFRPublisher();

      case '@gouvfr/dsfr-doc':
        return new DSFRDocPublisher();

      default:
        log.error(`No publisher found for ${pck.name}`);
    }
  }
}

export { Publication };
