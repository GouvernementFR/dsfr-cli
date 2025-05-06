import { Renderable } from '../../core/renderable.js';
import { TagAttributes } from '@gouvfr/dsfr-forge'

const DIST_FILES = [
  'dsfr',
  'utility/utility',
];

const DEFAULT_LIB_FILES = [
  'dsfr-doc-main',
];

const STYLES_MAP = new Map([
  ['search', 'dsfr-doc-search'],
  ['home', 'dsfr-doc-home'],
]);

class Stylesheets extends Renderable {
  constructor (data) {
    super(data);
    this._stylesheets = [
      ...DIST_FILES.map(filename => new Stylesheet({ href: `/dist/${filename}.min.css` })),
      ...DEFAULT_LIB_FILES.map(filename => new Stylesheet({ href: `/lib/${filename}.min.css` }))
    ];
    if (Array.isArray(this.data.styles) && this.data.styles.length > 0) {
      this._stylesheets.push(...this.data.styles.map(style => new Stylesheet({ href: `/lib/${STYLES_MAP.get(style)}.min.css` })));
    }
  }
  async render () {
    const stylesheets = await Promise.all(this._stylesheets.map(async stylesheet => await stylesheet.render()));
    return stylesheets.join('\n');
  }
}

class Stylesheet extends Renderable {
  constructor (data) {
    super(data);
    this._attributes = new TagAttributes();
    this._attributes.setAttribute('rel', 'stylesheet');
    this._attributes.setAttribute('href', this.data.href);
    if (this.data.integrity) this._attributes.setAttribute('integrity', this.data.integrity);
    if (this.data.crossorigin) this._attributes.setAttribute('crossorigin', this.data.crossorigin);
  }
  async render () {
    return `<link${this._attributes.render()}>`;
  }
}

export { Stylesheets };
