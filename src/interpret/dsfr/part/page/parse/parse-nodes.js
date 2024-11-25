import { HTML_NODE_CLOSURES, HtmlNodeParser } from './html-node-parser.js';
import { log } from '@gouvfr/dsfr-cli-utils';
import { parseMarkdown } from './parse-markdown.js';

const parseNodes = (nodes) => {
  if (!nodes || !nodes.length) return nodes;
  const htmlNodes = nodes.filter(node => node.type === 'html');

  htmlNodes.forEach(node => {
    if (node.value.lastIndexOf('<') > 0 || node.value.indexOf('>') < node.value.length - 1) {
      log.warn(`HTML nodes unparsed: ${node.value}`);
      const replace = parseMarkdown(`‡${node.value}`)?.children?.[0]?.children.slice(1, -1);
      if (replace && replace.length) {
        log.info(`HTML nodes parsed: ${replace.map(node => node.value).join('')}`);
        nodes.splice(nodes.indexOf(node), 1, ...replace);
        return parseNodes(nodes);
      }
    };
  });

  const parsers = nodes.filter(node => node.type === 'html').map(node => new HtmlNodeParser(node)).filter(node => node.closure !== HTML_NODE_CLOSURES.SELF);

  nodes = transform(nodes, parsers);

  nodes.forEach(node => parseNodes(node.children));

  return nodes;
};

const transform = (nodes, parsers) => {
  if (!parsers.length) return nodes;

  const exitParser = parsers.find(parser => parser.closure === HTML_NODE_CLOSURES.EXIT);

  if (!exitParser) {
    console.log(parsers.length);
    log.warn(`No closing tag found for ${parsers.map(parser => parser.tagName).join(',')}`);
    return nodes;
  }

  const exitParserIndex = parsers.indexOf(exitParser);
  const enterParser = parsers.slice(0, exitParserIndex).filter(parser => parser.closure === HTML_NODE_CLOSURES.ENTER && parser.tagName === exitParser.tagName).pop();

  if (!enterParser) {
    log.error(`No opening tag found for ${exitParser.tagName}`);
    parsers.splice(exitParserIndex, 1);
    return transform(nodes, parsers);
  }

  const enterParserIndex = parsers.indexOf(enterParser);
  parsers.splice(enterParserIndex, exitParserIndex - enterParserIndex + 1);

  const enterNodeIndex = nodes.indexOf(enterParser.node);
  const exitNodeIndex = nodes.indexOf(exitParser.node);

  const node = {
    type: 'htmlContainer',
    tagName: enterParser.tagName,
    attributes: enterParser.attributes,
    classes: enterParser.classes,
    children: nodes.slice(enterNodeIndex + 1, exitNodeIndex)
  };

  nodes.splice(enterNodeIndex, exitNodeIndex - enterNodeIndex + 1, node);

  return transform(nodes, parsers);
};

export { parseNodes };
