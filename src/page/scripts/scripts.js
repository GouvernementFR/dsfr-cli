import { Renderable } from '../../core/renderable.js';
import { TagAttributes } from '@gouvfr/dsfr-forge';
import { HIGHLIGHT_SCRIPTS } from './highlight.js'

const DIST_FILES = [
  'dsfr',
];

const DEFAULT_LIB_FILES = [
  'dsfr-doc-main',
];

const SCRIPTS_MAP = new Map([
  ['search', 'dsfr-doc-search'],
  ['home', 'dsfr-doc-home']
]);

class Scripts extends Renderable {
  constructor (data) {
    super(data);
    this._innerScript = this.data.innerScript ?? '';
    this._scripts = [
      ...DIST_FILES.map(filename => new Script({ src: `/dist/${filename}.module.min.js`, type: 'module' })),
      ...DEFAULT_LIB_FILES.map(filename => new Script({ src: `/lib/${filename}.min.js`, type: 'module' })),
    ];

    if (Array.isArray(this.data.scripts) && this.data.scripts.length > 0) {
      this._scripts.push(...this.data.scripts.map(script => new Script({ src: `/lib/${SCRIPTS_MAP.get(script)}.min.js`, type: 'module' })));
    }

    this._scripts.push(...HIGHLIGHT_SCRIPTS.map(data => new Script(data)));
  }

  async render () {
    const scripts = await Promise.all(this._scripts.map(async script => await script.render()));
    return scripts.join('\n');
  }
}

class Script extends Renderable {
  constructor (data) {
    super(data)
    this._innerScript = this.data.innerScript ?? '';
    this._attributes = new TagAttributes();
    if (this.data.type) this._attributes.setAttribute('type', this.data.type);
    if (this.data.src) this._attributes.setAttribute('src', this.data.src);
    if (this.data.integrity) this._attributes.setAttribute('integrity', this.data.integrity);
    if (this.data.crossorigin) this._attributes.setAttribute('crossorigin', this.data.crossorigin);
    if (this.data.referrerPolicy) this._attributes.setAttribute('referrerpolicy', this.data.referrerPolicy);
    if (this.data.defer) this._attributes.setAttribute('defer', '');
    if (this.data.async) this._attributes.setAttribute('async', '');
  }
  async render () {
    return `<script${this._attributes.render()}>${this._innerScript}</script>`;
  }
}

export { Scripts };
