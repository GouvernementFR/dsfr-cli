import { Element } from '../core/element.js'

class Storybook extends Element {
  get iframe () {
    return this.element;
  }

  init() {
    this._iframeDoc = this.iframe.contentDocument;
    if (!this._iframeDoc) return;
    this.observeResize(this._iframeDoc.body);
  }

  resize () {
    const height = this._iframeDoc.body?.scrollHeight ?? this._iframeDoc.documentElement?.scrollHeight;
    this.iframe.style.height = isNaN(height) || !height ? '100%' : height + 'px';
  }
}

export default Storybook;
