class Renderable {
  constructor (data) {
    this._data = data;
  }

  get data () {
    return this._data;
  }

  async render () {
    return '';
  }
}

export { Renderable };
