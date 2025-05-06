class ResultsButton {
  constructor (url) {
    this._url = url;
    this._query = '';
  }

  set query (query) {
    this._query = query;
  }

  get query () {
    return this._query;
  }

  render () {
    return `<a class="fr-btn fr-btn--secondary fr-mt-2v" href="${this._url}?query=${this._query}" id="search-button">${window.resource?.search?.results?.button}</a>`;
  }
}

export { ResultsButton };
