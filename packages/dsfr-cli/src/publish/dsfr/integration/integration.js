import fs from 'fs';
import { copyDir, deleteDir } from '@gouvfr/dsfr-cli-utils';
import { DEPLOY_DIR, PUBLISHER_MODULE, DIST } from '../../../constants.js';
import { ScriptCompiler, StyleCompiler } from '@gouvfr/dsfr-compiler';

class Integration {
  static async integrate (clean = false, copy = false, compile = false) {
    const integration = new Integration();
    if (clean) await integration.clean();
    if (copy) await integration.copy();
    if (compile) await integration.compile();
  }
  async clean () {
    deleteDir(DEPLOY_DIR);
  }

  async copy () {
    if (!fs.existsSync(`${DEPLOY_DIR}/dist`)) await copyDir(DIST, `${DEPLOY_DIR}/dist`);
    await copyDir(`${PUBLISHER_MODULE}/static`, `${DEPLOY_DIR}/static`);
  }

  async compile () {
    const scriptCompiler = new ScriptCompiler();
    await scriptCompiler.compile(`${PUBLISHER_MODULE}/src/script/index.js`, `${DEPLOY_DIR}/lib`, 'dsfr-doc', { minify: true, map: true });

    const styleCompiler = new StyleCompiler();
    await styleCompiler.compile(`${PUBLISHER_MODULE}/src/style/index.scss`, `${DEPLOY_DIR}/lib`, 'dsfr-doc', { minify: true, map: true });
  }
}

export { Integration };
