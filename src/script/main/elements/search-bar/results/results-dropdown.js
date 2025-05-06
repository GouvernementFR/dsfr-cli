import { Element } from '../../../core/element.js';
import { ResultsEmpty } from './results-empty.js';
import { ResultsButton } from './results-button.js';
import { ResultsList } from './results-list.js';

class ResultsDropdown extends Element {
    constructor(url) {
        const element = document.createElement('div');
        element.classList.add('dsfr-doc-search-results--dropdown');
        super(element);

        this._button = new ResultsButton(url);
    }

    async init() {
        await window.searchEngine.init('searchBar');
    }

    reset() {
        this.element.innerHTML = '';
    }

    update(query) {
        if (query.length <= 2) {
            this.reset();
            return;
        }

        const results = window.searchEngine.search(query);

        switch (true) {
            case !results:
            case results.length === 0:
                const empty = new ResultsEmpty(query);
                this._content = empty.render();
                break;

            default:
                const list = new ResultsList(results);
                this._button.query = query;
                this._content = list.render() + this._button.render();
        }

        this.element.innerHTML = `<div class="fr-px-md-4v fr-py-6v">${this._content}</div>`;
    }
}

export { ResultsDropdown };
