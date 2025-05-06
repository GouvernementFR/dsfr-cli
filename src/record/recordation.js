import fs from 'fs';
import { log } from '@gouvfr/dsfr-forge';
import { DsfrRecorder } from './dsfr/dsfr-recorder.js';

class Recordation {
  async record (settings) {
    log.section('Recordation');
    const recorder = await this.getRecorder();
    await recorder.record(settings);
  }

  async getRecorder () {
    const pckFile = fs.readFileSync('package.json');
    const pck = JSON.parse(pckFile.toString('utf-8'));

    log.info(`package ${pck.name}`);

    switch (pck.name) {
      case '@gouvfr/dsfr':
        return new DsfrRecorder(pck);

      default:
        log.error(`No configurator found for ${pck.name}`);
    }
  }
}

export { Recordation };
