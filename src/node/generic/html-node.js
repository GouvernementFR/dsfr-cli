import { Node } from '../node.js';

class HtmlNode extends Node {
  async render() {
    return /^<\//.test(this.data.value) ? this.data.value : this.data.value.replace(/>$/, `${this.renderAttributes()}>`);
  }
}

HtmlNode.TYPE = 'html';

export { HtmlNode };
