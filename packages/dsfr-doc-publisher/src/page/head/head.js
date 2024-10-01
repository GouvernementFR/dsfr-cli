import { Title } from './title.js';
import { Canonical } from './canonical.js';
import { Stylesheets } from './stylesheets.js';

class Head {
  constructor (data) {
    this._data = data;
    this._title = new Title(data.title);
    this._canonical = new Canonical(data.url, data.alts);
    this._stylesheets = new Stylesheets();
  }

  get html () {
    return `
      <head>
        ${this._title.html}
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no">
        ${this._canonical.html}
        ${this._stylesheets.html}
      </head>
    `;
  }
}

export { Head };
