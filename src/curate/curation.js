import fs from 'fs';
import { log } from '@gouvfr/dsfr-forge';
import { DsfrCurator } from './dsfr/dsfr-curator.js';
import { DsfrRootCurator } from './dsfr-root/dsfr-root-curator.js';

//TODO: clean before copying
//TODO: optimize images
//TODO: copy from root
//TODO: copy on doc-static (lore)

class Curation {
  async curate (settings) {
    log.section('Curation');
    const curator = await this.getCurator();
    await curator.curate(settings);
  }

  async getCurator () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile.toString('utf-8'));

    log.info(`package ${pck.name}`);

    switch (pck.name) {
      case '@gouvfr/dsfr':
        return new DsfrCurator();

      case '@gouvfr/dsfr-root':
        return new DsfrRootCurator();

      default:
        log.error(`No curator found for ${pck.name}`);
    }
  }

}

export { Curation };
