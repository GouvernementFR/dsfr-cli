import { Element } from '../../core/element.js';
import { PaginationList } from './pagination-list.js';

class Pagination extends Element {
    constructor(data, resultsPerPage = 10) {
        const element = document.createElement('section');
        element.classList.add('dsfr-doc--pagination', 'fr-my-8v');
        super(element, 'pagination');

        this._totalPages = Math.ceil(data.length / resultsPerPage);
    }

    init() {
        const list = new PaginationList(this._totalPages);
        const content = list.render();

        this.element.innerHTML = `<nav role="navigation" class="fr-pagination" aria-label="Pagination">
            ${content}
        </nav>`;
    }
}

export { Pagination };
