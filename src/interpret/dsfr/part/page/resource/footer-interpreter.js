import { interpretLink } from '../interpret-link.js';

class FooterInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    interpretLink(this._data.link, this._state);

    if (this._data?.top?.categories) this._data.top.categories.forEach(category => category.links.forEach(link => interpretLink(link, this._state)));
    if (this._data?.content?.links) this._data.content.links.forEach(link => interpretLink(link, this._state));
    if (this._data?.bottom?.links) this._data.bottom.links.forEach(link => interpretLink(link, this._state));
  }
}

export { FooterInterpreter };
