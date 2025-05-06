class HeaderInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    this._data.link = this._state.resolveItem(this._data?.link);
    this._data.links = this._data.links.map(link => this._state.resolveItem(link));
    this._data.search = this._state.resolveItem(this._data?.search);
  }
}

export { HeaderInterpreter };
