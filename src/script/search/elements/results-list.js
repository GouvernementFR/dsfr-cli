import { Element } from '../../main/core/element.js';
import { ResultCard } from './result-card.js';
import { getCurrentPagination } from '../../main/core/get-query.js';

class ResultsList extends Element {
    constructor(data, resultsPerPage = 10) {
        const element = document.createElement('section');
        element.classList.add('fr-mt-8v', 'fr-mb-14v');
        super(element, 'resultsList');

        const page = getCurrentPagination() || 1;
        const results = data.slice(
            (page - 1) * resultsPerPage,
            page * resultsPerPage
        );

        this._cards = results.map((cardData) => new ResultCard(cardData));
    }

    init() {
        this.element.innerHTML = this._cards.map((item) => item.render()).join('');
    }
}

export { ResultsList };
