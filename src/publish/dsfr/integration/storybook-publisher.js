import fs from 'fs';
import { execSync } from 'child_process';
import { copyDir, log } from '@gouvfr/dsfr-forge';

class StorybookPublisher {
  constructor (state) {
    this._state = state;
  }

  async copy () {
    switch (this._state.version.major) {
      case 1:
        await this._copyV1();
        break;
      case 2:
        await this._copyV2();
        break;
      default:
        log.warn('Storybook not copied');
    }
  }

  async _copyV1 () {
    if (!fs.existsSync(`${this._state.root}/storybook`)) {
      log.warn('Missing "storybook" directory');
      return;
    }
    await copyDir(`${this._state.root}/storybook`, `${this._state.dest}/${this._state.version.text}/storybook`);
  }

  async _copyV2 () {
    log.warn('Storybook V2 not ready');
  }
}

export { StorybookPublisher };
