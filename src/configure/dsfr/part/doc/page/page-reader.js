import fs from 'fs';
import yaml from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { Front } from './front.js';
import { createFile } from '../../../../../utilities/file.js';

const EXTENSIONS = [
  frontmatter(['yaml'])
];
const MDAST_EXTENSIONS = [
  frontmatterFromMarkdown(['yaml'])
];

const OPTIONS = {
  extensions: EXTENSIONS,
  mdastExtensions: MDAST_EXTENSIONS
};


class PageReader {
  constructor (state, doc) {
    this._state = state;
    this._doc = doc;
    this._part = null;
    this._has = false;
    this._up = null;
  }

  get src () {
    return this._state.src;
  }

  get has () {
    return this._has;
  }

  get locale () {
    return this._state.i18n.current;
  }

  get url () {
    return this._url;
  }

  get header () {
    if (this._front.header) return this._front.header;
    if (this._up) return this._up.header;
    return {};
  }

  get footer () {
    if (this._front.footer) return this._front.footer;
    if (this._up) return this._up.footer;
    return {};
  }

  get follow () {
    if (this._front.follow) return this._front.follow;
    if (this._up) return this._up.follow;
    return {};
  }

  get meta () {
    return {
      ...this?._up?.meta,
      ...this._front.meta
    }
  }



  async read () {
    if (!fs.existsSync(this._state.src)) return;
    const markdown = fs.readFileSync(this._state.src, 'utf8');
    const mdast = fromMarkdown(markdown, OPTIONS);
    this._has = true;

    const yamlNode = mdast.children.find(node => node.type === 'yaml');
    if (!yamlNode) throw new Error(`No frontmatter found in ${this._state.src}`);
    this._front = new Front(yamlNode.value);

    if (this._doc.up) {
      this._up = this._doc.up.getPage(this.locale);
    }

    this._url = this._up ? `${this._up.url}${this._front.segment}/` : `${this.locale.code}/${this._state.version.feature}/`;
  }

  get data () {
    return {
      locale: this._state.i18n.current.code,
      src: this._state.src,
      url: this._url,
      path: this._doc.path,
      meta: this.meta,
      header: this.header,
      footer: this.footer,
      follow: this.follow,
      nav: {}
    }
  }

  async write () {
    createFile(`${this._state.dest}flatplan/${this._url.replace(/\//g, '⧸')}index.yml`, yaml.stringify(this.data));
  }
}

export { PageReader };
