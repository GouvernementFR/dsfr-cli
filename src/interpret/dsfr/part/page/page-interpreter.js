import fs from 'fs';
import yaml from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { directive } from 'micromark-extension-directive';
import { gfm } from 'micromark-extension-gfm';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { directiveFromMarkdown } from 'mdast-util-directive';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { pageNodeFactory } from './node/page-node-factory.js';
import { createFile } from '@gouvfr/dsfr-cli-utils';
import { HeaderInterpreter } from './resource/header-interpreter.js';
import { FooterInterpreter } from './resource/footer-interpreter.js';
import { NavigationInterpreter } from './resource/navigation-interpreter.js';

const EXTENSIONS = [
  frontmatter(['yaml']),
  directive(),
  gfm(),
];
const MDAST_EXTENSIONS = [
  frontmatterFromMarkdown(['yaml']),
  directiveFromMarkdown(),
  gfmFromMarkdown(),
];

const OPTIONS = {
  extensions: EXTENSIONS,
  mdastExtensions: MDAST_EXTENSIONS
};

const collectAssets = (node) => {
  const assets = node.children.map(childNode => collectAssets(childNode)).flat();
  if (node.type === 'image') assets.push(node.asset);
  return assets;
};

class PageInterpreter {
  constructor (state) {
    this._state = state;
    this._assets = [];
  }

  get src () {
    return this._state.src;
  }

  async read () {
    const dataFile = fs.readFileSync(this._state.src, 'utf8');
    this._data = yaml.parse(dataFile);
    const state = this._state.setPath(this._data.path);
    this._header = new HeaderInterpreter(state, this._data.resource.header);
    this._footer = new FooterInterpreter(state, this._data.resource.footer);
    this._navigation = new NavigationInterpreter(state, this._data.resource.navigation);
  }

  async interpret () {
    const markdown = fs.readFileSync(this._data.src, 'utf8');
    const mdast = fromMarkdown(markdown, OPTIONS);

    const state = this._state.setPaths(this._data.src, this._data.url, this._data.path);

    this._nodes = mdast.children.slice(1).map(node => pageNodeFactory(node, state));

    this._assets = this._nodes.map(node => collectAssets(node)).flat();

    await this._header.resolve();
    await this._footer.resolve();
    await this._navigation.resolve();
  }

  get data () {
    return {
      ...this._data,
      nodes: this._nodes.map(node => node.data)
    }
  }

  get assets () {
    return this._assets;
  }

  async write () {
    createFile(this._state.dest, yaml.stringify(this.data));
  }
}

export { PageInterpreter };
