import { instantiateElements } from '../main/core/element.js'
import { InjectSvg } from './inject-svg.js'
import { ShowOnScroll } from './show-on-scroll.js'
import { StopVideoOnClose } from './stop-video-on-close.js'

window.onload = () => {
  instantiateElements('img[src$=".svg"]', InjectSvg);
  instantiateElements('[dsfr-doc-show-on-scroll]', ShowOnScroll);
  instantiateElements('.fr-modal', StopVideoOnClose);
};
