import { Renderable } from '../../core/renderable.js';

class Title extends Renderable {
  async render () {
    return `<title>${this.data.title}</title>`;
  }
}

export { Title };
