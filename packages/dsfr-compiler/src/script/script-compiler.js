import { rollup } from 'rollup';

class ScriptCompiler {
  getAppendix (minify) {
    switch (true) {
      case minify:
        return '.min.js';
      default:
        return '.js';
    }
  }

  _getOutputOptions (dest, filename, minify = false, map = false, banner = undefined) {
    const appendix = this.getAppendix(minify);
    return {
      file: `${dest}/${filename}${appendix}`,
      format: 'esm',
      sourcemap: map ? 'hidden' : false,
      banner: banner
    };
  }

  async compile (src, dest, filename, options = { minify: false, map: false, banner: undefined}) {
    const { minify, map , banner} = options;
    const appendix = this.getAppendix(minify);
    const inputOptions = {
      input: src,
      plugins: [
        // ...rollup plugins
      ]
    };

    const outputOptionsList = [this._getOutputOptions(dest, filename, false, map, banner)];
    if (minify) {
      outputOptionsList.push(this._getOutputOptions(dest, filename, true, map, banner));
    }

    let bundle;
    let buildFailed = false;
    try {
      bundle = await rollup(inputOptions);
      for (const outputOptions of outputOptionsList) {
        const { output } = await bundle.write(outputOptions);
        console.log(output);
      }
    } catch (error) {
      buildFailed = true;
      console.error(error);
    }
    if (bundle) {
      await bundle.close();
    }
  }
}

export { ScriptCompiler };
