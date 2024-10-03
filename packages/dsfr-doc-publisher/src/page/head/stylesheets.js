const DIST_FILES = [
  'dsfr',
  'utility/utility',
];

const LIB_FILES = [
  'dsfr-doc',
];



class Stylesheets {
  constructor () {
    const srcs = [...DIST_FILES.map(file => `/dist/${file}.min.css`), ...LIB_FILES.map(file => `/lib/${file}.min.css`)];
    this._html = srcs.map(src => `<link rel="stylesheet" href="${src}">`).join('\n');
  }

  get html () {
    return this._html;
  }
}

export { Stylesheets };
