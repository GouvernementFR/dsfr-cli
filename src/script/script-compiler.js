import { log } from '@gouvfr/dsfr-forge';
import * as esbuild from 'esbuild';
import fs from 'fs'

class ScriptCompiler {
  async compile (src, dest, filename, options = { minify: false, sourceMap: false, banner: undefined}) {
    const { minify, sourceMap , banner} = options;

    await this._build(src, dest, filename, false, sourceMap, banner);

    if (minify) {
      await this._build(src, dest, filename, true, sourceMap, banner);
    }
  }

  async _build (src, dest, filename, minify = false, sourceMap = false, banner = undefined) {
    const appendix = minify ? '.min.js' : '.js';
    const bannerOpt = banner ? { js: banner } : undefined;

    const options = {
      entryPoints: [src],
      bundle: true,
      minify: minify,
      format: 'esm',
      sourcemap: sourceMap,
      outfile: `${dest}/${filename}${appendix}`,
      banner: bannerOpt
    };

    try {
      await esbuild.build(options);
      log.file(options.outfile, `${fs.statSync(options.outfile)?.size} bytes`);
    }
    catch (error) {
      log.error(error);
    }
  }
}

export { ScriptCompiler };
