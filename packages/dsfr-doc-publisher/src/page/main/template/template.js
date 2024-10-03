import { Contents } from '../contents/contents.js';

class Template {
  constructor (data, type) {
    this._data = data;
    this._type = type;
    this._contents = new Contents(data);
  }

  get type () {
    return this._type;
  }

  get htmlContents () {
    return this._contents.html;
  }

  async render () {
    await this._contents.render();
  }



  get html () {
    return this.htmlContents;
  }
}

export { Template };
