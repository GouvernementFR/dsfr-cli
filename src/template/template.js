import { Renderable } from '../core/renderable.js';
import { nodeFactory } from '../node/node-factory.js';

class Template extends Renderable {
  constructor (data) {
    super(data);
    nodeFactory.populate(data.fragments);
    this._content = nodeFactory.create({
      type: 'root',
      children: data.nodes
    });
  }

  get name () {
    return this.constructor.NAME;
  }

  async render () {
    return await this._content.render();
  }

  get text () {
    return this._content.text;
  }
}

export { Template };
