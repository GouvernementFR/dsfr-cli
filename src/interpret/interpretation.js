import fs from 'fs';
import { log } from '@gouvfr/dsfr-cli-utils';
import { DSFRInterpreter } from './dsfr/dsfr-interpreter.js';
import { DSFRDocInterpreter } from './dsfr-doc/dsfr-doc-interpreter.js';

class Interpretation {
  async interpret (settings) {
    log.section('Interpretation');

    const interpretation = await this.getInterpretation();
    await interpretation.interpret(settings);
  }

  async getInterpretation () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile.toString('utf-8'));

    log.info(`package ${pck.name}`);

    switch (pck.name) {
      case '@gouvfr/dsfr':
        return new DSFRInterpreter();

      case '@gouvfr/dsfr-doc':
        return new DSFRDocInterpreter();

      default:
        log.error(`No interpreter found for ${pck.name}`);
    }
  }
}

export { Interpretation };
