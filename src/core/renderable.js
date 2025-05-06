class Renderable {
  constructor (data) {
    data = this.structure(data);
    this._data = data;
  }

  structure (data) {
    return data;
  }

  get data () {
    return this._data;
  }

  async render () {
    return '';
  }
}

export { Renderable };
