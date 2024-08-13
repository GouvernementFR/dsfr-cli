import yaml from 'yaml';

class PageFront {
  constructor (data) {
    this._data = yaml.parse(data);
    this._title = this._data.title;
    this._segment = this._data.segment;
    this._part = this._data.part;
    console.log('front', this._segment, this._title);
  }

  get title () {
    return this._title;
  }

  get segment () {
    return this._segment;
  }

  get part () {
    return this._part;
  }

  get data () {
    return {
      title: this._title,
      segment: this._segment
    };
  }
}

export { PageFront };
