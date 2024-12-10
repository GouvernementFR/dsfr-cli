import fs from 'fs';
import yaml from 'yaml';
import { pageNodeFactory } from './node/page-node-factory.js';
import { createFile } from '@gouvfr/dsfr-cli-utils';
import { HeaderInterpreter } from './resource/header-interpreter.js';
import { FooterInterpreter } from './resource/footer-interpreter.js';
import { NavigationInterpreter } from './resource/navigation-interpreter.js';
import { parseNodes } from './parse/parse-nodes.js';
import { parseMarkdown } from './parse/parse-markdown.js';

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
    const state = this._state.setPath(this._data.path).setFragments(this._data.fragments);
    this._header = new HeaderInterpreter(state, this._data.resource.header);
    this._footer = new FooterInterpreter(state, this._data.resource.footer);
    this._navigation = new NavigationInterpreter(state, this._data.resource.navigation);
  }

  async interpret () {
    const markdown = fs.readFileSync(this._data.src, 'utf8');
    const mdast = parseMarkdown(markdown);

    const state = this._state.setPaths(this._data.src, this._data.url, this._data.path).setFragments(this._data.fragments);

    const nodes = parseNodes(mdast.children.slice(1));

    this._nodes = nodes.map(node => pageNodeFactory(node, state));

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
