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
import { TableHeadNode } from './gfm/table-head-node.js';
import { TableBodyNode } from './gfm/table-body-node.js';
import { TableRowNode } from './gfm/table-row-node.js';
import { TableHeaderNode } from './gfm/table-header-node.js';
import { TableCellNode } from './gfm/table-cell-node.js';
import { NodeRoot } from './node-root.js';
import { HpHeroContainerDirective } from './directive/home/hp-hero-container-directive.js';
import { HpDiscoverContainerDirective } from './directive/home/hp-discover-container-directive.js';
import { HpDiscoverTileContainerDirective } from './directive/home/hp-discover-tile-container-directive.js';
import { HpSliceVideoContainerDirective } from './directive/home/hp-slice-video-container-directive.js';
import { HpGoalsContainerDirective } from './directive/home/hp-goals-container-directive.js';
import { HpShowcaseContainerDirective } from './directive/home/hp-showcase-container-directive.js';
import { HpShowcaseCardContainerDirective } from './directive/home/hp-showcase-card-container-directive.js';
import { HpCommunityContainerDirective } from './directive/home/hp-community-container-directive.js';
import { HpCommunityTileContainerDirective } from './directive/home/hp-community-tile-container-directive.js';
import { HpNewsContainerDirective } from './directive/home/hp-news-container-directive.js';
import { HpFaqContainerDirective } from './directive/home/hp-faq-container-directive.js';
import { HpAnalyticsContainerDirective } from './directive/home/hp-analytics-container-directive.js';
import { AccordionContainerDirective } from './directive/components/accordion/accordion-container-directive.js';
import { AccordionsGroupContainerDirective } from './directive/components/accordion/accordions-group-container-directive.js';
import { ButtonLeafDirective } from './directive/components/button/button-leaf-directive.js'
import { CardContainerDirective } from './directive/components/card/card-container-directive.js';
import { TableContainerDirective } from './directive/components/table/table-container-directive.js';
import { TabContainerDirective } from './directive/components/tabs/tab-container-directive.js'
import { TabsContainerDirective } from './directive/components/tabs/tabs-container-directive.js'
import { TileContainerDirective } from './directive/components/tile/tile-container-directive.js';
import { AnatomyContainerDirective } from './directive/doc/guidance/anatomy-container-directive.js';
import { PinLeafDirective } from './directive/doc/guidance/pin-leaf-directive.js';
import { GuidelineContainerDirective } from './directive/doc/guidance/guideline-container-directive.js';
import { GuidelinesContainerDirective } from './directive/doc/guidance/guidelines-container-directive.js';
import { TabNavigationContainerDirective } from './directive/doc/tab-navigation-container-directive.js';
import { StorybookLeafDirective } from './directive/doc/storybook-leaf-directive.js';
import { FigmaLeafDirective } from './directive/doc/figma-leaf-directive.js';
import { PageItemListLeafDirective } from './directive/doc/page-item-list-leaf-directive.js';
import { PageItemCardContainerDirective } from './directive/doc/page-item-card-container-directive.js';
import { VideoLeafDirective } from  './directive/doc/video-leaf-directive.js';
import { ImageTextDirective } from './directive/doc/image-text-directive.js'
import { ChangelogLeafDirective } from './directive/doc/changelog-leaf-directive.js'


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
  TableHeadNode,
  TableBodyNode,
  TableHeaderNode,
  TableRowNode,
  TableCellNode
];

const nodesMap = new Map(NODES.map(Node => [Node.TYPE, Node]));

const DIRECTIVE_CONTAINERS = [
  HpHeroContainerDirective,
  HpDiscoverContainerDirective,
  HpDiscoverTileContainerDirective,
  HpSliceVideoContainerDirective,
  HpGoalsContainerDirective,
  HpShowcaseContainerDirective,
  HpShowcaseCardContainerDirective,
  HpCommunityContainerDirective,
  HpCommunityTileContainerDirective,
  HpNewsContainerDirective,
  HpFaqContainerDirective,
  HpAnalyticsContainerDirective,
  AccordionContainerDirective,
  AccordionsGroupContainerDirective,
  CardContainerDirective,
  PageItemCardContainerDirective,
  TileContainerDirective,
  GuidelineContainerDirective,
  GuidelinesContainerDirective,
  TabNavigationContainerDirective,
  TableContainerDirective,
  TabContainerDirective,
  TabsContainerDirective,
  AnatomyContainerDirective
];
const DIRECTIVE_LEAFS = [
  ButtonLeafDirective,
  StorybookLeafDirective,
  FigmaLeafDirective,
  ChangelogLeafDirective,
  PinLeafDirective,
  VideoLeafDirective,
  PageItemListLeafDirective
];
const DIRECTIVE_TEXTS = [
  ImageTextDirective
];
const containersMap = new Map(DIRECTIVE_CONTAINERS.map(Container => [Container.NAME, Container]));
const leafsMap = new Map(DIRECTIVE_LEAFS.map(Leaf => [Leaf.NAME, Leaf]));
const textsMap = new Map(DIRECTIVE_TEXTS.map(Text => [Text.NAME, Text]));

class NodeFactory {
  populate (fragments) {
    this._fragments = fragments;
  }

  decorate (data) {
    data.fragments = this._fragments;
  }

  getNodeConstructor (data) {
    switch (data.type) {
      case 'containerDirective':
        return containersMap.get(data.name);
      case 'leafDirective':
        return leafsMap.get(data.name);
      case 'textDirective':
        return textsMap.get(data.name);
    }
    return nodesMap.get(data.type);
  }

  create (data) {
    const NodeConstructor = this.getNodeConstructor(data) ?? Node;
    this.decorate(data);
    const node = new NodeConstructor(data);
    return node;
  }
}

export const nodeFactory = new NodeFactory();
