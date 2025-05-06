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
import { HtmlContainerNode} from './custom/html-container-node.js';
import { DeleteNode } from './gfm/delete-node.js';
import { TableNode } from './gfm/table-node.js';
import { TableRowNode } from './gfm/table-row-node.js';
import { TableCellNode } from './gfm/table-cell-node.js';
import { DirectiveNode } from './directive/directive-node.js';
import { StorybookLeafDirectiveNode } from './directive/storybook-leaf-directive-node.js';
import { FigmaLeafDirectiveNode } from './directive/figma-leaf-directive-node.js';
import { ChangelogLeafDirectiveNode } from './directive/changelog-leaf-directive-node.js';
import { PageItemListLeafDirectiveNode } from './directive/page-item-list-leaf-directive-node.js';
import { HpHeroContainerDirectiveNode } from './directive/home/hp-hero-container-directive-node.js';
import { HpDiscoverTileContainerDirectiveNode } from './directive/home/hp-discover-tile-container-directive-node.js';
import { HpSliceVideoContainerDirectiveNode } from './directive/home/hp-slice-video-container-directive-node.js';
import { HpCommunityContainerDirectiveNode } from './directive/home/hp-community-container-directive-node.js';
import { HpCommunityTileContainerDirectiveNode } from './directive/home/hp-community-tile-container-directive-node.js';
import { HpShowcaseCardContainerDirectiveNode } from './directive/home/hp-showcase-card-container-directive-node.js';
import { HpAnalyticsContainerDirectiveNode } from './directive/home/hp-analytics-container-directive-node.js';

const NODES = [
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
  ListNode,
  ListItemNode,
  ParagraphNode,
  StrongNode,
  TextNode,
  ThematicBreakNode,
  HtmlContainerNode,
  DeleteNode,
  TableNode,
  TableRowNode,
  TableCellNode
];

const nodesMap = new Map(NODES.map(Node => [Node.TYPE, Node]));

const CONTAINER_DIRECTIVE_NODES = [
  HpHeroContainerDirectiveNode,
  HpDiscoverTileContainerDirectiveNode,
  HpSliceVideoContainerDirectiveNode,
  HpCommunityContainerDirectiveNode,
  HpCommunityTileContainerDirectiveNode,
  HpShowcaseCardContainerDirectiveNode,
  HpAnalyticsContainerDirectiveNode
];
const LEAF_DIRECTIVE_NODES = [
  StorybookLeafDirectiveNode,
  FigmaLeafDirectiveNode,
  ChangelogLeafDirectiveNode,
  PageItemListLeafDirectiveNode
];
const TEXT_DIRECTIVE_NODES = [

];

const containersMap = new Map(CONTAINER_DIRECTIVE_NODES.map((Container) => [Container.NAME, Container]));

const leafsMap = new Map(LEAF_DIRECTIVE_NODES.map((Leaf) => [Leaf.NAME, Leaf]));

const textsMap = new Map(TEXT_DIRECTIVE_NODES.map((Text) => [Text.NAME, Text]));

const getNodeConstructor = (data) => {
  switch (data.type) {
    case 'containerDirective':
      return containersMap.get(data.name) ?? DirectiveNode;
    case 'leafDirective':
      return leafsMap.get(data.name) ?? DirectiveNode;
    case 'textDirective':
      return textsMap.get(data.name) ?? DirectiveNode;
  }
  return nodesMap.get(data.type);
};

export const pageNodeFactory = (data, state) => {
  const NodeConstructor = getNodeConstructor(data) ??PageNode;
  const node = new NodeConstructor(data, state);
  return node;
};
