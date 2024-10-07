import { Renderable } from '../../core/renderable.js';

const DIST_FILES = [
  'dsfr',
  'utility/utility',
];

const LIB_FILES = [
  'dsfr-doc',
];

class Stylesheets extends Renderable {
  async render () {
    const srcs = [...DIST_FILES.map(file => `/dist/${file}.min.css`), ...LIB_FILES.map(file => `/lib/${file}.min.css`)];
    return srcs.map(src => `<link rel="stylesheet" href="${src}">`).join('\n');
  }
}

export { Stylesheets };
