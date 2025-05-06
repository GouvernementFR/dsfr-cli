import { ROLLER_MODULE, BANNER } from '../constants.js';
import { copyDir, getPackagePath, log } from '@gouvfr/dsfr-forge';
import { ScriptCompiler, StyleCompiler } from '@gouvfr/dsfr-alchemist'
import path from 'path'
import fs from 'fs'

class Bundler {
  constructor (dest, env) {
    this._dest = dest;
    this._env = env;
  }

  async copy (context = 'local') {
    await copyDir(path.join(ROLLER_MODULE, 'static'), path.join(this._dest, 'static'));

    switch (context) {
      case 'archive':
        await copyDir(path.join(ROLLER_MODULE, 'env'), this._env);
        break;

      case 'local':
      default:
        await copyDir(path.join(ROLLER_MODULE, 'env/local'), this._dest);
        break;
    }
  }

  async compile () {
    await this._compileScripts();
    await this._compileStyles();
  }

  async _compileScripts () {
    const scriptCompiler = new ScriptCompiler();
    const entries = fs.readdirSync(`${ROLLER_MODULE}/src/script`, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const index = `${ROLLER_MODULE}/src/script/${entry.name}/index.js`;
      if (!fs.existsSync(index)) continue;
      await scriptCompiler.compile(index, `${this._dest}/lib`, `dsfr-doc-${entry.name}`, {
        minify: true, sourceMap: true, banner: BANNER
      });
    }
  }

  async _compileStyles () {
    const modulesPath = path.resolve(getPackagePath('@gouvfr/dsfr-publisher'), '../../') + '/';
    const styleCompiler = new StyleCompiler();
    const entries = fs.readdirSync(`${ROLLER_MODULE}/src/style`, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const index = `${ROLLER_MODULE}/src/style/${entry.name}/index.scss`;
      if (!fs.existsSync(index)) continue;
      await styleCompiler.compile(index, `${this._dest}/lib`, `dsfr-doc-${entry.name}`, { minify: true, sourceMap: true, banner: BANNER, loadPaths: [modulesPath] });
    }
  }
}

export { Bundler };
