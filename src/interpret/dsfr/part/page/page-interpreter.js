import fs from 'fs';
import yaml from 'yaml';
import { pageNodeFactory } from './node/page-node-factory.js';
import { createFile } from '@gouvfr/dsfr-forge';
import { HeaderInterpreter } from './resource/header-interpreter.js';
import { FooterInterpreter } from './resource/footer-interpreter.js';
import { NavigationInterpreter } from './resource/navigation-interpreter.js';
import { parseNodes } from './parse/parse-nodes.js';
import { parseMarkdown } from './parse/parse-markdown.js';
import { fragments } from '@gouvfr/dsfr-lore';

class PageInterpreter {
  constructor (state, filename) {
    this._state = state;
    this._filename = filename;
    this._assets = [];
  }

  get src () {
    return this._state.src;
  }

  async read () {
    const dataFile = fs.readFileSync(this._state.configFile(`flatplan/${this._filename}`), 'utf8');
    this._data = yaml.parse(dataFile);
    const state = this._state.setData(this._data);
    this._header = new HeaderInterpreter(state, this._data.resource.header);
    this._footer = new FooterInterpreter(state, this._data.resource.footer);
    this._navigation = new NavigationInterpreter(state, this._data.resource.navigation);

    const markdown = fs.readFileSync(this._data.src, 'utf8');
    const mdast = parseMarkdown(markdown);

    const nodes = parseNodes(mdast.children.slice(1));

    this._nodes = nodes.map(node => pageNodeFactory(node, state));

    this._assets = this._data?.assets ?? [];
    this._assets.push(...this._nodes.map(node => node.assets).flat());
    await this._header.resolve();
    await this._footer.resolve();
    await this._navigation.resolve();
  }

  get data () {
    const version = {
      button: fragments.getFragment(this._data.lang, 'version.button.text'),
      versions: this._state.getVersionsData(this._data.path)
    };

    return {
      ...this._data,
      version: version,
      nodes: this._nodes.map(node => node.data)
    }
  }

  get assets () {
    return this._assets;
  }

  async write () {
    createFile(this._state.configFile(`pages/${this._filename}`), yaml.stringify(this.data));
  }
}

export { PageInterpreter };
