import { interpretLink } from '../interpret-link.js';

class HeaderInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    interpretLink(this._data.link, this._state);
    this._data.links.forEach(link => interpretLink(link, this._state));
  }
}

export { HeaderInterpreter };
