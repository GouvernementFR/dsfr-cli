import { Node } from '../node.js';

class HtmlNode extends Node {
  async render() {
    return 'HTML';
  }
}

HtmlNode.TYPE = 'html';

export { HtmlNode };
