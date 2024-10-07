import { Renderable } from '../../core/renderable.js';

const DIST_FILES = [
  'dsfr',
];

const LIB_FILES = [
  'dsfr-doc',
];

class Scripts extends Renderable {
  async render () {
    const srcs = [...DIST_FILES.map(file => `/dist/${file}.module.min.js`), ...LIB_FILES.map(file => `/lib/${file}.min.js`)];

    return srcs.map(src => `<script type="module" src="${src}"></script>`).join('\n');
  }
}

export { Scripts };
