import { frontmatter } from 'micromark-extension-frontmatter';
import { directive } from 'micromark-extension-directive';
import { gfm } from 'micromark-extension-gfm';
import { frontmatterFromMarkdown } from 'mdast-util-frontmatter';
import { directiveFromMarkdown } from 'mdast-util-directive';
import { gfmFromMarkdown } from 'mdast-util-gfm';
import { fromMarkdown } from 'mdast-util-from-markdown';

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

const parseMarkdown = (markdown) => fromMarkdown(markdown, OPTIONS);

export { parseMarkdown };
