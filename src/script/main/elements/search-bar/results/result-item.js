class ResultItem {
  constructor (data) {
    this._title = data.title;
    this._url = data.url;

  }

  render () {
    return `<li><a class="fr-link" href="${this._url}" >${this._title}</a></li>`;
  }
}

export { ResultItem };
