import { ResultItem } from './result-item.js';

const MAX_RESULTS = 6;

class ResultsList {
  constructor (data) {
    this._items = data.slice(0, MAX_RESULTS).map(itemData => new ResultItem(itemData));
  }

  render() {
    return `<ul class="dsfr-doc-search-results--list">
${this._items.map(item => item.render()).join('')}
</ul>`;

  }

}

export { ResultsList };
