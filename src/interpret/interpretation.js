import fs from 'fs';
import { log } from '@gouvfr/dsfr-forge';
import { DsfrInterpreter } from './dsfr/dsfr-interpreter.js';
import { DsfrArchiveInterpreter } from './dsfr-archive/dsfr-archive-interpreter.js';

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
        return new DsfrInterpreter();

      case '@gouvfr/dsfr-archive':
        return new DsfrArchiveInterpreter();

      default:
        throw new Error(`No interpreter found for ${pck.name}`);
    }
  }
}

export { Interpretation };
