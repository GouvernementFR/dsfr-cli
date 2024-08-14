import { PageNode } from './page-node.js';
import { BlockquoteNode } from './generic/blockquote-node.js';
import { BreakNode } from './generic/break-node.js';
import { CodeNode } from './generic/code-node.js';
import { DefinitionNode } from './generic/definition-node.js';
import { EmphasisNode } from './generic/emphasis-node.js';
import { HeadingNode } from './generic/heading-node.js';
import { HtmlNode } from './generic/html-node.js';
import { ImageNode } from './generic/image-node.js';
import { ImageReferenceNode } from './generic/image-reference-node.js';
import { InlineCodeNode } from './generic/inline-code-node.js';
import { LinkNode } from './generic/link-node.js';
import { LinkReferenceNode } from './generic/link-reference-node.js';
import { ListNode } from './generic/list-node.js';
import { ListItemNode } from './generic/list-item-node.js';
import { ParagraphNode } from './generic/paragraph-node.js';
import { StrongNode } from './generic/strong-node.js';
import { TextNode } from './generic/text-node.js';
import { ThematicBreakNode } from './generic/thematic-break-node.js';
import { TextDirectiveNode } from './directive/text-directive-node.js';
import { LeafDirectiveNode } from './directive/leaf-directive-node.js';
import { ContainerDirectiveNode } from './directive/container-directive-node.js';
import { DeleteNode } from './gfm/delete-node.js';
import { TableNode } from './gfm/table-node.js';
import { TableRowNode } from './gfm/table-row-node.js';
import { TableCellNode } from './gfm/table-cell-node.js';

const NODES = {
  blockquote: BlockquoteNode,
  break: BreakNode,
  code: CodeNode,
  definition: DefinitionNode,
  emphasis: EmphasisNode,
  heading: HeadingNode,
  html: HtmlNode,
  image: ImageNode,
  imageReference: ImageReferenceNode,
  inlineCode: InlineCodeNode,
  link: LinkNode,
  linkReference: LinkReferenceNode,
  list: ListNode,
  listItem: ListItemNode,
  paragraph: ParagraphNode,
  strong: StrongNode,
  text: TextNode,
  thematicBreak: ThematicBreakNode,
  textDirective: TextDirectiveNode,
  leafDirective: LeafDirectiveNode,
  containerDirective: ContainerDirectiveNode,
  delete: DeleteNode,
  table: TableNode,
  tableRow: TableRowNode,
  tableCell: TableCellNode
};

class PageNodeFactory {
  getNode (data, state) {
    const Node = NODES[data.type] ?? PageNode;
    return  new Node(data, state);
  }
}

const factory = new PageNodeFactory();

export default factory;
