import { Title } from './title.js';
import { Canonical } from './canonical.js';
import { Stylesheets } from './stylesheets.js';
import { Renderable } from '../../core/renderable.js';
import { Favicon } from './favicon.js';
import { Resource } from './resource.js';
import { Share } from './share.js';

class Head extends Renderable {

  constructor (data) {
    super(data);
    this._title = new Title(data);
    this._canonical = new Canonical(data);
    this._favicon = new Favicon(data);
    this._resource = new Resource(data);
    this._share = new Share(data);
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
        ${await this._favicon.render()}
        ${await this._share.render()}
        ${await this._stylesheets.render()}
        ${await this._resource.render()}
      </head>
    `;
  }
}

export { Head };
