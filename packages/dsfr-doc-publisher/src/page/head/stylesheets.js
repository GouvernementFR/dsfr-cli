const STYLE_FILES = [
  'dsfr',
  'utility/utility',
];

class Stylesheets {
  constructor () {
    this._html = STYLE_FILES.map(file => `<link rel="stylesheet" href="/dist/${file}.min.css">`).join('\n');
  }

  get html () {
    return this._html;
  }
}

export { Stylesheets };
