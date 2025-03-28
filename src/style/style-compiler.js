import * as sass from 'sass';
import path from 'path';
import * as url from 'node:url'
import { createFile, log } from '@gouvfr/dsfr-forge'
import { transform } from 'lightningcss';

class StyleCompiler {
  _getDestFile (dest, filename, minify = false, sourceMap = false) {
    const appendices = ['css'];
    if (minify) appendices.unshift('min');
    if (sourceMap) appendices.push('map');
    const appendix = appendices.join('.');
    return `${dest}/${filename}.${appendix}`;
  }

  async compile (src, dest, filename, options = { minify: false, sourceMap: false, banner: undefined, loadPaths: [] }) {
    const { minify, sourceMap, banner, loadPaths } = options;

    const outputOptions = {
      outFile: this._getDestFile(dest, filename),
      style: 'expanded',
      loadPaths: [
        '.',
        ...loadPaths,
      ]
    };

    if (sourceMap) {
      outputOptions.sourceMap = true;
      outputOptions.sourceMapIncludeSources = true;
    }

    const output= await this._compileSass(src, outputOptions);

    const css = banner ? `${banner}\n\n${output.css}`: output.css;

    let outputSourceMap;

    if (output.sourceMap) {
      const relativeSourceMap = {
        version: output.sourceMap.version,
        sources: output.sourceMap.sources.map(source => path.relative(process.cwd(), url.fileURLToPath(source))),
        mappings: output.sourceMap.mappings,
        file: output.sourceMap.file,
        sourceRoot: output.sourceMap.sourceRoot,
        names: output.sourceMap.names,
        sourcesContent: output.sourceMap.sourcesContent
      };
      outputSourceMap = JSON.stringify(relativeSourceMap);
    }

    await this._create(dest, filename, false, outputSourceMap, css);

    if (minify) await this._minify(dest, filename, true, outputSourceMap, css);
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

  async _minify (dest, filename, minify, sourceMap, css) {
    const options = {
      filename: filename,
      code: Buffer.from(css),
      minify: true
    };

    if (sourceMap) {
      options.inputSourceMap = sourceMap;
      options.sourceMap = true;
    }

    let { code, map } = transform(options);

    await this._create(dest, filename, minify, map, code);
  }

  async _create (dest, filename, minify, sourceMap, css) {
    const appendices = ['css'];
    if (minify) appendices.unshift('min');
    const appendix = appendices.join('.');
    const to = `${dest}/${filename}.${appendix}`;

    const size = createFile(to, css, true);
    log.file(to, `${size} bytes`);

    if (sourceMap) createFile(`${to}.map`, sourceMap, true);
  }
}

export { StyleCompiler };
