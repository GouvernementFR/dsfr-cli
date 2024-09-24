import fs from 'fs';
import yaml from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { Front } from './front.js';
import { createFile } from '../../../../../utils/file.js';

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


class PageParser {
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

  get alt () {
    return this._alt;
  }

  get filename () {
    return this._filename;
  }

  get breadcrumbs () {
    return this._breadcrumbs;
  }

  get meta () {
    return {
      ...this?._up?.meta,
      ...this._front.meta
    }
  }

  async read () {
    if (!fs.existsSync(this._state.src)) return;
    this._has = true;
    const markdown = fs.readFileSync(this._state.src, 'utf8');
    const mdast = fromMarkdown(markdown, OPTIONS);

    const yamlNode = mdast.children.find(node => node.type === 'yaml');
    if (!yamlNode) throw new Error(`No frontmatter found in ${this._state.src}`);
    this._front = new Front(yamlNode.value);

    if (this._doc.up) {
      this._up = this._doc.up.getPage(this.locale);
    }

    this._url = this._up ? `${this._up.url}/${this._front.segment}` : `/${this._state.versionSegment}/${this.locale.code}`;
    this._alt = {
      lang: this.locale.code,
      href: this._url
    }
    this._filename = `${this._url.replace(/\//g, '⧸')}⧸index.yml`;
    const breadcrumb = {
      label: this._front.breadcrumb ?? this._front.title,
      href: `${this._url}`
    };
    this._breadcrumbs = [...this._up ? this._up.breadcrumbs : [], breadcrumb];
  }

  get data () {
    return {
      lang: this._state.i18n.current.code,
      src: this._state.src,
      href: this._url,
      alts: this._doc.getAlts(this.locale),
      depth: this._doc.depth,
      path: this._doc.path,
      title: this._front.title,
      meta: this.meta,
      template: this._front.template,
      versions: [
        {
          label: this._state.versionLabel,
          badge: this._state.getFragments().current.label,
          url: '',
          active: true
        }
      ],
      breadcrumb: {
        segments: this.breadcrumbs
      },
      resource: this._state.getResource(),
      fragments: this._state.getFragments(),
      nav: {}
    }
  }

  async write () {
    createFile(`${this._state.dest}/flatplan/${this._filename}`, yaml.stringify(this.data));
  }
}

export { PageParser };