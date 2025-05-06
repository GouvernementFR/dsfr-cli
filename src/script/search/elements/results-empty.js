import { replaceFragment } from '../../../core/replace-fragments.js';

class ResultsEmpty {
  constructor (query) {
    this._query = query;
  }
  render () {
    const noResults = window.resource?.search?.noresults;
    return `
    <p class="fr-mb-2v">
        <strong>${replaceFragment(noResults?.title, this._query)}</strong>
    </p>
    <p class="fr-mb-2v">${noResults?.subtitle}</p>
    <ul class="dsfr-doc-search-results--list--no-results">
        <li>${noResults?.suggestions1}</li>
        <li>${noResults?.suggestions2}</li>
    </ul>`;
  }
}

export { ResultsEmpty };
