import { log } from '@gouvfr/dsfr-cli-utils';
import browserSync from 'browser-sync';

class Exposition {
  async expose (settings) {
    log.section('Exposition');

    browserSync({
      server: {
        baseDir: './.doc'
      },
      open: false,
      port: 3000,
      ui: {
        port: 3001
      }
    });
  }
}

export { Exposition };
