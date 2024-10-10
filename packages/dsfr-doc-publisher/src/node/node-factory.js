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
import { NodeRoot } from './node-root.js';

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
];

const nodesMap = new Map(NODES.map(Node => [Node.TYPE, Node]));

export const nodeFactory = (data) => {
  const NodeConstructor = nodesMap.get(data.type) ?? Node;
  const node = new NodeConstructor(data);
  return node;
}
