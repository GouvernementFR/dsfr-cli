import { Element } from '../../main/core/element.js';
import { getQuery } from '../../main/core/get-query.js';
import { ResultsList } from './results-list.js';
import { ResultsCount } from './results-count.js';
import { Pagination } from '../../main/elements/pagination/index.js';

const RESULTS_PER_PAGES = 10;

class SearchPage extends Element {
    constructor(element) {
        super(element, 'searchPage');

        this._query = getQuery();
        this._searchBarInput = document.querySelector('#search-input');
        this._resultsCount = document.querySelector('#results-count');
        this._resultsList = document.querySelector('#results-cards');
        this._container = element.querySelector('#results-page--container');
    }

    async init() {
        await window.searchEngine.init('searchPage');

        if (this._query) {
            this._searchBarInput.value = this._query;
            const results = window.searchEngine.search(this._query);

            const count = new ResultsCount(results.length);
            const resultsList = new ResultsList(results, RESULTS_PER_PAGES);

            this._resultsCount.innerHTML = count.render();

            this._container.appendChild(resultsList.element);
            resultsList.init();

            if (results.length > RESULTS_PER_PAGES) {
                const pagination = new Pagination(results, RESULTS_PER_PAGES);
                this._container.appendChild(pagination.element);
                pagination.init();
            }
        }
    }
}

export { SearchPage };
