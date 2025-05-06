class Element {
  constructor (element) {
    this._element = element;
  }

  get element () {
    return this._element;
  }

  async init () {}

  observeResize (target) {
    this._observer = new ResizeObserver(this.resize.bind(this));
    this._observer.observe(target);
  }

  resize () {}

  listenClick (target) {
    target.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick () {}
}

const instantiateElements = async (selector, ElementClass) => {
  const elements = [...document.querySelectorAll(selector)].map(element => new ElementClass(element))
  const promises = elements.map(element => element.init());
  await Promise.all(promises);
  return elements;
}

export { Element, instantiateElements };
