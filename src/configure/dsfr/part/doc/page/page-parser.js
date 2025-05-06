import fs from 'fs';
import yaml from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { Front } from './front.js';
import { createFile } from '@gouvfr/dsfr-forge';
import { fragments } from '@gouvfr/dsfr-lore';
import { ImageAsset } from '../../../../../common/asset/image-asset.js';
import { MAP_SORTERS_KEYS } from '../../../../../common/utiliy/sort/map-sorters.js';

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
    this._parent = null;
    this._assets = {};
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
      ...this?._parent?.meta,
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

    if (this._doc.parent) {
      this._parent = this._doc.parent.getPage(this.locale);
    }

    this._url = this._parent ? `${this._parent.url}/${this._front.segment}` : `/${this._state.versionSegment}/${this.locale.code}`;
    this._alt = {
      lang: this.locale.code,
      url: this._url
    }
    this._filename = `${this._url.replace(/\//g, '⧸')}⧸index.yml`;
    const breadcrumb = {
      text: this._front.shortTitle,
      url: `${this._url}`
    };
    this._breadcrumbs = [...this._parent ? this._parent.breadcrumbs : [], breadcrumb];

    this._map = {
      url: this._url,
      text: this._front.shortTitle,
      config: this._state.configFile(`flatplan/${this._filename}`)
    }
  }

  get mapSettings () {
    const settings = {};

    const sorters = {};
    MAP_SORTERS_KEYS.forEach(key => {
      if (this._front[key] !== undefined) sorters[key] = this._front[key];
    });

    if (Object.keys(sorters).length > 0) {
      settings.sorters = sorters;
    }
    if (this._front.sort) settings.sort = this._front.sort;

    return settings;
  }

  addAsset (property, url) {
    if (!url) return;
    const asset = ImageAsset.fromState(url, this._state);
    this._assets[property] = asset.url;
    if (!this._assets.assets) this._assets.assets = [];
    this._assets.assets.push(asset.data);
  }

  get data () {
    const languages = this._doc.getLanguages(this.locale).map(language => ({ ...language , name: fragments.getFragment(this.locale.code, `translate.${language.locale}`) }));

    const translate = languages.length > 1 ? {  button: fragments.getFragment(this.locale.code, 'translate.button.text'),
      languages: languages } : undefined;

    const breadcrumb = {
      button: fragments.getFragment(this.locale.code, 'breadcrumb.button.text'),
      segments: this.breadcrumbs
    };

    this.addAsset('cover', this._front.cover);

    return {
      lang: this._state.i18n.current.code,
      src: this._state.src,
      url: this._url,
      alts: this._doc.getAlts(this.locale),
      editUrl: this._state.editUrl,
      depth: this._doc.depth,
      path: this._doc.path,
      deploy: this._state.deploy,
      part: this._doc.part.id,
      title: this._front.title,
      shortTitle: this._front.shortTitle,
      ...this._assets,
      section: this.breadcrumbs?.[1]?.text,
      description: this._front.description,
      shortDescription: this._front.shortDescription,
      keywords: this._front.keywords,
      summary: this._front.summary,
      excerpt: this._front.excerpt,
      boost: this._front.boost,
      published: this._front.published,
      meta: this.meta,
      template: this._front.template,
      scripts: this._front.scripts,
      styles: this._front.styles,
      translate: translate,
      breadcrumb: breadcrumb,
      resource: this._state.getResource(),
      fragments: fragments.getFragments(this.locale.code),
      nav: {}
    }
  }

  async write () {
    createFile(this._state.configFile(`flatplan/${this._filename}`), yaml.stringify(this.data));
  }
}

export { PageParser };
