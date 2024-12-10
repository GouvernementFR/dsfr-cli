import { Node } from './node.js';
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
import { ListItemNode } from './generic/list-item-node.js';
import { ListNode } from './generic/list-node.js';
import { ParagraphNode } from './generic/paragraph-node.js';
import { StrongNode } from './generic/strong-node.js';
import { TextNode } from './generic/text-node.js';
import { ThematicBreakNode } from './generic/thematic-break-node.js';
import { TableNode } from './gfm/table-node.js';
import { TableRowNode } from './gfm/table-row-node.js';
import { TableCellNode } from './gfm/table-cell-node.js';
import { NodeRoot } from './node-root.js';
import { TabNavigationContainerDirective } from './directive/doc/tab-navigation-container-directive.js';
import { StorybookLeafDirective } from './directive/doc/storybook-leaf-directive.js';

const NODES = [
  NodeRoot,
  BlockquoteNode,
  BreakNode,
  CodeNode,
  DefinitionNode,
  EmphasisNode,
  HeadingNode,
  HtmlNode,
  ImageNode,
  ImageReferenceNode,
  InlineCodeNode,
  LinkNode,
  LinkReferenceNode,
  ListItemNode,
  ListNode,
  ParagraphNode,
  StrongNode,
  TextNode,
  ThematicBreakNode,
  TableNode,
  TableRowNode,
  TableCellNode
];

const nodesMap = new Map(NODES.map(Node => [Node.TYPE, Node]));

const DIRECTIVE_CONTAINERS = [
  TabNavigationContainerDirective
];
const DIRECTIVE_LEAFS = [
  StorybookLeafDirective
];
const DIRECTIVE_TEXTS = [

];
const containersMap = new Map(DIRECTIVE_CONTAINERS.map(Container => [Container.NAME, Container]));
const leafsMap = new Map(DIRECTIVE_LEAFS.map(Leaf => [Leaf.NAME, Leaf]));
const textsMap = new Map(DIRECTIVE_TEXTS.map(Text => [Text.NAME, Text]));

const getNodeConstructor = (data) => {
  switch (data.type) {
    case 'containerDirective':
      return containersMap.get(data.name);
    case 'leafDirective':
      return leafsMap.get(data.name);
    case 'TextDirective':
      return textsMap.get(data.name);
  }
  return nodesMap.get(data.type);
};

export const nodeFactory = (data) => {
  const NodeConstructor = getNodeConstructor(data) ?? Node;
  const node = new NodeConstructor(data);
  return node;
};
