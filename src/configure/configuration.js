import fs from 'fs';
import log from '../utils/log.js';
import { DSFRConfigurator } from './dsfr/dsfr-configurator.js';
import { DSFRDocConfigurator } from './dsfr-doc/dsfr-doc-configurator.js';

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
        return new DSFRConfigurator();

      case '@gouvfr/dsfr-doc':
        return new DSFRDocConfigurator();

      default:
        log.error(`No configurator found for ${pck.name}`);
    }
  }

}

export { Configuration };
