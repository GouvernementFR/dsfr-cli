import { Element } from '../main/core/element.js'

class InjectSvg extends Element {
  init() {
    this._src = this._element.getAttribute('src');
    this._class = this._element.getAttribute('class');
    this._ariaHidden = this._element.getAttribute('aria-hidden');
    this._alt = this._element.getAttribute('alt');
    this.replaceSvg();
  }

  replaceSvg() {
    fetch(this._src)
      .then(response => response.text())
      .then(svg => {
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = svgDocument.querySelector('svg');
        if (this._class) svgElement.setAttribute('class', this._class);
        if (this._ariaHidden !== null) svgElement.setAttribute('aria-hidden', this._ariaHidden);
        if (this._alt) svgElement.setAttribute('aria-label', this._alt);
        this._element.parentNode.insertBefore(svgElement, this._element);
        this._element.remove();
      });
  }
}

export { InjectSvg };