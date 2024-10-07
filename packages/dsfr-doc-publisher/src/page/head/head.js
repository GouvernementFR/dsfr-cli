import { Title } from './title.js';
import { Canonical } from './canonical.js';
import { Stylesheets } from './stylesheets.js';
import { Renderable } from '../../core/renderable.js';

class Head extends Renderable {

  constructor (data) {
    super(data);
    this._title = new Title(data);
    this._canonical = new Canonical(data);
    this._stylesheets = new Stylesheets(data);
  }

  async render () {
    return `
      <head>
        ${await this._title.render()}
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no">
        ${await this._canonical.render()}
        ${await this._stylesheets.render()}        
      </head>
    `;
  }
}

export { Head };
