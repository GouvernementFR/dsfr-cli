import fs from 'fs';
import { log } from '@gouvfr/dsfr-forge';
import { DsfrConfigurator } from './dsfr/dsfr-configurator.js';
import { DsfrArchiveConfigurator } from './dsfr-archive/dsfr-archive-configurator.js';

class Configuration {
  async configure (settings) {
    log.section('Configuration');
    const configurator = await this.getConfigurator();
    await configurator.configure(settings);
  }

  async getConfigurator () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile.toString('utf-8'));

    log.info(`package ${pck.name}`);

    switch (pck.name) {
      case '@gouvfr/dsfr':
        return new DsfrConfigurator();

      case '@gouvfr/dsfr-archive':
        return new DsfrArchiveConfigurator();

      default:
        throw new Error(`No configurator found for ${pck.name}`);
    }
  }

}

export { Configuration };
