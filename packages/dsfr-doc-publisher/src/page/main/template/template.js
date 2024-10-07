import { Contents } from '../contents/contents.js';
import { Renderable } from '../../../core/renderable.js';

class Template extends Renderable {
  constructor (data, type) {
    super(data);
    this._type = type;
    this._contents = new Contents(data);
  }

  get type () {
    return this._type;
  }

  async render () {
    return await this._contents.render();
  }
}

export { Template };
