import { Element } from '../main/core/element.js'

class StopVideoOnClose extends Element {
  init() {
    this._element.addEventListener('dsfr.conceal', () => {
      this._iframe = this._element.querySelector('iframe');
      if (this._iframe) {
        this._iframe.setAttribute('src', this._iframe.getAttribute('src'));
      }

      this._video = this._element.querySelector('video');
      if (this._video) {
        this._video.pause();
      }
    });
  }

}

export { StopVideoOnClose };
