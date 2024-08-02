import fs from 'fs';
import { DSFRConfigurator } from './dsfr/dsfr-configurator.js';
import log from '../utilities/log.js';

class Configuration {
  constructor() {
    log.section('Configuration');
  }

  configure () {
    const configurator = this.configurator;
    configurator.configure();
  }

  get configurator () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile);

    log.info('Configuration du package ' + pck.name);

    switch (pck.name) {
      case 'dsfr':
        return new DSFRConfigurator();
      default:
        log.error('Aucun configurateur trouvé pour le package ' + pck.name);
    }
  }

}

export { Configuration };
