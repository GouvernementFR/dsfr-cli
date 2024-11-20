class FooterInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    this._data.link = this._state.resolveItem(this._data?.link);
    if (this._data?.top?.categories) this._data.top.categories.forEach(category => category.links = category.links.map(link => this._state.resolveItem(link)));
    if (this._data?.content?.links) this._data.content.links = this._data.content.links.map(link => this._state.resolveItem(link));
    if (this._data?.bottom?.links) this._data.bottom.links = this._data.bottom.links.map(link => this._state.resolveItem(link));
  }
}

export { FooterInterpreter };
