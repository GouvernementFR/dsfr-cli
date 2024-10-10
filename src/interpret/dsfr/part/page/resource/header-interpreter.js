class HeaderInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    if (this._data?.link?.url) this._data.link.url = this._state.resolveFrom(this._data.link.url);
    this._data.links.forEach(link => {
      if (link.url) link.url = this._state.resolveFrom(link.url);
    });
  }
}

export { HeaderInterpreter };
