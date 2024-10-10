import { Renderable } from '../core/renderable.js';
import { nodeFactory } from '../node/node-factory.js';

class Template extends Renderable {
  constructor (data) {
    super(data);
    this._content = nodeFactory({
      type: 'root',
      children: data.nodes
    })
  }

  get type () {
    return this.constructor.TYPE;
  }

  async render () {
    return await this._content.render();
  }
}

export { Template };
