import fs from 'fs';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import { directive } from 'micromark-extension-directive';
import { gfm } from 'micromark-extension-gfm';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { directiveFromMarkdown } from 'mdast-util-directive';
import { gfmFromMarkdown } from 'mdast-util-gfm';
// import { toHast } from 'mdast-util-to-hast';



const doc = await fs.readFile('example.md')

const tree = fromMarkdown(doc, {
  extensions: [gfm()],
  mdastExtensions: [gfmFromMarkdown()]
})


import { PageFront } from './page-front.js';
import { PageBody } from './page-body.js';

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

class PageContent {
  constructor () {
  }

  get front () {
    return this._front;
  }

  async read (src) {
    const markdown = fs.readFileSync(src, 'utf8');
    const mdast = fromMarkdown(markdown, OPTIONS);
    // console.log(JSON.stringify(toHast(mdast), null, 2));
    const yamlNode = mdast.children.find(node => node.type === 'yaml');
    if (!yamlNode) throw new Error(`No frontmatter found in ${src}`);
    this._front = new PageFront(yamlNode.value);
    const nodes = mdast.children.filter(node => node !== yamlNode);
    this._body = new PageBody(nodes);
  }

  get data () {
    return {
      front: this._front.data,
      body: this._body.data
    };
  }

}

export { PageContent };
