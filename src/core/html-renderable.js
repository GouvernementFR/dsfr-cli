import { Renderable } from './renderable.js';
import { formatHtml } from './format-html.js';

class HtmlRenderable extends Renderable {
  async format (html) {
    return formatHtml(html, this._data.src);
  }
}

export { HtmlRenderable };
