import { Element } from '../core/element.js'

class CopySnippet extends Element {
  get button () {
    return this.element;
  }
  init() {
    this._copyLabel = this.button.innerText;
    this._copiedLabel = this.button.getAttribute('data-label-copied');
    this._code = this.button.previousElementSibling.innerText;
    this.listenClick(this.button);
  }

  get isCopied () {
    return this._isCopied;
  }

  set isCopied (value) {
    this._isCopied = value;
    this.button.innerText = value ? this._copiedLabel : this._copyLabel;
    this.button.disabled = value;
  }

  handleClick () {
    navigator.clipboard.writeText(this._code);
    this.isCopied = true;
    setTimeout(this._handleTimeout.bind(this), 1500);
  }

  _handleTimeout () {
    this.isCopied = false;
  }
}

export default CopySnippet;
