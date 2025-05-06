import { Renderable } from '../../core/renderable.js';

class Share extends Renderable {
  constructor(data) {
    super(data, 'share');
    this._resource = data.resource || {};
    this._title = `${data.title} - ${this._resource?.meta?.title}`;
    this._description = data.description || this._resource?.meta?.description;
    this._cover = data.cover || '/static/img/placeholder.16x9.png';
    this._url = this._resource?.meta?.baseUrl + data.url;
    this._locale = `${data.lang}_${data.lang.toUpperCase()}`;
  }

  async render() {
    return `
      <meta property="og:title" content="${this._title}">
      <meta property="og:description" content="${this._description}">
      <meta property="og:image" content="${this._cover}">
      <meta property="og:type" content="website">
      <meta property="og:url" content="${this._url}">
      <meta property="og:locale" content="${this._locale}">

      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${this._title}">
      <meta name="twitter:description" content="${this._description}">
      <meta name="twitter:site" content="@gouvernementFR">
      <meta name="twitter:image" content="${this._cover}">
    `;
  }
}

export { Share };
