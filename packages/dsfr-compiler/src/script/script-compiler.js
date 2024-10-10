import { rollup } from 'rollup';
import terser from '@rollup/plugin-terser';
import { log } from '@gouvfr/dsfr-cli-utils';

class ScriptCompiler {
  _getAppendix (minify) {
    switch (true) {
      case minify:
        return '.min.js';
      default:
        return '.js';
    }
  }

  _getOutputOptions (dest, filename, minify = false, map = false, banner = undefined, plugins = []) {
    const appendix = this._getAppendix(minify);
    return {
      file: `${dest}/${filename}${appendix}`,
      format: 'esm',
      sourcemap: map ? 'hidden' : false,
      banner: banner,
      plugins: plugins
    };
  }

  async compile (src, dest, filename, options = { minify: false, map: false, banner: undefined}) {
    const { minify, map , banner} = options;
    const inputOptions = {
      input: src
    };

    const outputOptionsList = [this._getOutputOptions(dest, filename, false, map, banner)];
    if (minify) {
      outputOptionsList.push(this._getOutputOptions(dest, filename, true, map, banner, [terser()]));
    }

    let bundle;
    let buildFailed = false;
    try {
      bundle = await rollup(inputOptions);
      for (const outputOptions of outputOptionsList) {
        const { output } = await bundle.write(outputOptions);
      }
    } catch (error) {
      buildFailed = true;
      log.error(error.error);
    }
    if (bundle) {
      await bundle.close();
    }
  }
}

export { ScriptCompiler };
