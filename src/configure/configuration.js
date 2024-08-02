import fs from 'fs';
import { DSFRConfigurator } from './dsfr/dsfr-configurator';

class Configuration {
  constructor() {

  }

  configure () {
    const configurator = this.configurator;
    configurator.configure();
  }

  get configurator () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile);

    switch (pck.name) {
      case 'dsfr':
        return new DSFRConfigurator();
      default:
        throw new Error('Aucun configurateur trouvé pour le package ' + pck.name);
    }
  }

}

export { Configuration };
