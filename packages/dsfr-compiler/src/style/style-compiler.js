import * as sass from 'sass'
import { createFile, log } from '@gouvfr/dsfr-cli-utils';
import postcss from 'postcss';
import cssnano from 'cssnano';
import postcssHeader from 'postcss-header';

class StyleCompiler {

  _getAppendix (minify = false, map = false) {
    switch (true) {
      case map && minify:
        return '.min.css.map';
      case map:
        return '.css.map';
      case minify:
        return '.min.css';
      default:
        return '.css';
    }
  }

  _getDestFile (dest, filename, minify = false, map = false) {
    return `${dest}/${filename}${this._getAppendix(minify, map)}`;
  }

  async compile (src, dest, filename, options = { minify: false, map: false, banner: undefined}) {
    const { minify, map, banner } = options;

    const outputOptions = {
      outFile: this._getDestFile(dest, filename),
      style: 'expanded',
      loadPaths: ['.']
    };

    if (map) {
      outputOptions.sourceMap = true;
      outputOptions.sourceMapIncludeSources = true;
    }

    const result = await this._compileSass(src, outputOptions);

    await this._process(dest, filename, result, false, map, banner);

    if (minify) await this._process(dest, filename, result, true, map, banner);
  }

  async _compileSass (path, options) {
    try {
      return await sass.compileAsync(path, options);
    } catch (e) {
      log.error(e.message);
      try {
        process.kill(0);
      } catch (e) {
        return null;
      }
    }
  }

  async _process (dest, filename, sassOutput, minify, map, banner) {
    const to = this._getDestFile(dest, filename, minify);
    const options = { from: undefined, to: to };
    const plugins = [];

    if (map) {
      options.map = { prev: sassOutput.sourceMap };
    }

    if (banner) {
      plugins.push(postcssHeader({ header: banner }));
    }

    if (minify) {
      plugins.push(cssnano());
    }

    const result = await postcss(plugins)
      .process(sassOutput.css, options);

    const size = createFile(to, result.css, true);
    log.file(to, `${size} bytes`);

    if (map) createFile(this._getDestFile(dest, filename, minify, true), result.map.toString(), true);
  }
}

export { StyleCompiler };
