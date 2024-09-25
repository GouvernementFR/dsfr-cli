import fs from 'fs';
import yaml from 'yaml';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { directive } from 'micromark-extension-directive';
import { gfm } from 'micromark-extension-gfm';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { directiveFromMarkdown } from 'mdast-util-directive';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import factory from './node/page-node-factory.js';
import { createFile } from '../../../../utils/file.js';
import { HeaderInterpreter } from './resource/header-interpreter.js';
import { FooterInterpreter } from './resource/footer-interpreter.js';

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

class PageInterpreter {
  constructor (state) {
    this._state = state;
  }

  get src () {
    return this._state.src;
  }

  async read () {
    const dataFile = fs.readFileSync(this._state.src, 'utf8');
    this._data = yaml.parse(dataFile);
    this._header = new HeaderInterpreter(this._state, this._data.resource.header);
    this._footer = new FooterInterpreter(this._state, this._data.resource.footer);
  }

  async interpret () {
    const markdown = fs.readFileSync(this._data.src, 'utf8');
    const mdast = fromMarkdown(markdown, OPTIONS);

    this._nodes = mdast.children.slice(1).map(node => factory.getNode(node, this._state));

    await this._header.resolve();
    await this._footer.resolve();
  }

  get data () {
    return {
      ...this._data,
      nodes: this._nodes.map(node => node.data)
    }
  }

  async write () {
    createFile(this._state.dest, yaml.stringify(this.data));
  }
}

export { PageInterpreter };
