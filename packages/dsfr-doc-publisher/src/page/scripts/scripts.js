const MODULES_FILES = [
  'dsfr',
];

const NOMODULES_FILES = [
  ...MODULES_FILES
];

class Scripts {
  constructor () {
    const modules = MODULES_FILES.map(file => `<script type="module" src="/dist/${file}.module.min.js"></script>`);
    const nomodules = NOMODULES_FILES.map(file => `<script nomodule src="/dist/${file}.nomodule.min.js"></script>`);
    this._html = [...modules, ...nomodules].join('\n');
  }

  get html () {
    return this._html;
  }
}

export { Scripts };
