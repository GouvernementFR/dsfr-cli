const DIST_FILES = [
  'dsfr',
];

const LIB_FILES = [
  'dsfr-doc',
];

class Scripts {
  constructor () {
    const srcs = [...DIST_FILES.map(file => `/dist/${file}.module.min.js`), ...LIB_FILES.map(file => `/lib/${file}.min.js`)];
    this._html = srcs.map(src => `<script type="module" src="${src}"></script>`).join('\n');
  }

  get html () {
    return this._html;
  }
}

export { Scripts };
