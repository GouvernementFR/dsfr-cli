import { Element } from '../main/core/element.js'

class ShowOnScroll extends Element {
  init() {
    this._observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('dsfr-doc-in-view', true);
          return;
        }

        entry.target.setAttribute('dsfr-doc-in-view', false);
      });
    }, {
      rootMargin: '0px 0px -35% 0px',
      threshold: 0
    });

    this._observer.observe(this._element);
  }

}

export { ShowOnScroll };
