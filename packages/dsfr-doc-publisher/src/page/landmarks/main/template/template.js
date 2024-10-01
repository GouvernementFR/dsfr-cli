class Template {
  constructor (data, type) {
    this._data = data;
    this._type = type;
  }

  async render () {}

  get html () {
    return '';
  }
}

export { Template };
