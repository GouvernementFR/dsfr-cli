import yaml from 'yaml';

class Front {
  constructor (yml) {
    const data = yaml.parse(yml);
    this._title = data.title;
    this._segment = data.segment;
    this._meta = data.meta;
    this._header = data.header;
    this._footer = data.footer;
    this._follow = data.follow;
  }

  get title () {
    return this._title;
  }

  get segment () {
    return this._segment;
  }

  get meta () {
    return this._meta;
  }

  get header () {
    return this._header;
  }

  get footer () {
    return this._footer;
  }

  get follow () {
    return this._follow;
  }
}

export { Front };
