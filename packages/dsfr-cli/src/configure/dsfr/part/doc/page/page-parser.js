import fs from 'fs';
import yaml from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { Front } from './front.js';
import { createFile } from '@gouvfr/dsfr-cli-utils';

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

  get sort () {
    return this._doc.mainPage?._front?.sort ?? this._front.sort;
  }

  get url () {
    return this._url;
  }

  get map () {
    return this._map;
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
      url: this._url
    }
    this._filename = `${this._url.replace(/\//g, '⧸')}⧸index.yml`;
    const breadcrumb = {
      text: this._front.shortTitle,
      url: `${this._url}`
    };
    this._breadcrumbs = [...this._up ? this._up.breadcrumbs : [], breadcrumb];
    this._map = {
      url: this._url,
      text: this._front.shortTitle,
      sort: this.sort,
      kind: this._doc.kind
    }
  }

  get data () {
    const fragments = this._state.getFragments();

    const versions = [
      {
        text: this._state.version.text,
        badge: fragments.current.text,
        url: this._url,
        active: this._state.version.isCurrent
      }
    ];

    const version = {
      button: fragments.version.button.title,
      versions: versions
    };

    const languages = this._doc.getLanguages(this.locale).map(language => ({ ...language , name: fragments.translate[language.locale] }));

    const translate = languages.length > 1 ? {  button: fragments.translate.button.title,
      languages: languages } : undefined;

    const breadcrumb = {
      button: fragments.breadcrumb.button.title,
      segments: this.breadcrumbs
    };

    return {
      lang: this._state.i18n.current.code,
      src: this._state.src,
      url: this._url,
      alts: this._doc.getAlts(this.locale),
      depth: this._doc.depth,
      path: this._doc.path,
      title: this._front.title,
      shortTitle: this._front.shortTitle,
      sort: this.sort,
      meta: this.meta,
      template: this._front.template,
      version: version,
      translate: translate,
      breadcrumb: breadcrumb,
      resource: this._state.getResource(),
      fragments: fragments,
      nav: {}
    }
  }

  async write () {
    createFile(`${this._state.dest}/flatplan/${this._filename}`, yaml.stringify(this.data));
  }
}

export { PageParser };
