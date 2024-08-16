import yaml from 'yaml';

class Front {
  constructor (yml) {
    const data = yaml.parse(yml);
    this._title = data.title;
    this._segment = data.segment;
    this._meta = data.meta;
  }

  get title () {
    return this._title;
  }

  get segment () {
    return this._segment;
  }

  get data () {
    return {
      title: this._title,
      segment: this._segment,
      meta: this._meta
    };
  }
}

export { Front };
