class FooterInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    if (this._data?.link?.url) this._data.link.url = this._state.resolveFrom(this._data.link.url);

    if (this._data?.top?.categories) this._data.top.categories.forEach(category => category.links.forEach(link => {
      if (link.url) link.url = this._state.resolveFrom(link.url);
    }));
    if (this._data?.content?.links) this._data.content.links.forEach(link => {
      if (link.url) link.url = this._state.resolveFrom(link.url);
    });
    if (this._data?.bottom?.links) this._data.bottom.links.forEach(link => {
      if (link.url) link.url = this._state.resolveFrom(link.url);
    });
  }
}

export { FooterInterpreter };
