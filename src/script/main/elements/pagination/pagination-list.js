import {
    PaginationItem,
    PaginationItemTypes,
    PaginationItemPositions,
} from './pagination-item.js';
import { getCurrentPagination } from '../../core/get-query.js';

class PaginationList {
    constructor(pagesNumber) {
        this._currentPage = getCurrentPagination() || 1;
        this._totalPages = pagesNumber;
        this._items = [];
        this.init();
    }

    getPosition() {
        switch (true) {
            case this._currentPage === 1:
                return PaginationItemPositions.FIRST;
            case this._currentPage === this._totalPages:
                return PaginationItemPositions.LAST;
            default:
                return null;
        }
    }

    init() {
        const position = this.getPosition();
        this._items.push(
            new PaginationItem(
                PaginationItemTypes.FIRST,
                1,
                this._currentPage === 1,
                position
            )
        );
        this._items.push(
            new PaginationItem(
                PaginationItemTypes.PREV,
                Math.max(this._currentPage - 1, 1),
                this._currentPage === 1,
                position
            )
        );

        const pages =
            this._totalPages <= 5 ? this.getAllPages() : this.getDynamicPages();

        for (const page of pages) {
            this._items.push(
                new PaginationItem(
                    page.type,
                    page.index,
                    this._currentPage === page.index
                )
            );
        }

        this._items.push(
            new PaginationItem(
                PaginationItemTypes.NEXT,
                Math.min(this._currentPage + 1, this._totalPages),
                this._currentPage === this._totalPages,
                position
            )
        );
        this._items.push(
            new PaginationItem(
                PaginationItemTypes.LAST,
                this._totalPages,
                this._currentPage === this._totalPages,
                position
            )
        );
    }

    getAllPages() {
        return [
            ...Array.from({ length: this._totalPages }, (_, i) => ({
                type: PaginationItemTypes.PAGE,
                index: i + 1,
            })),
        ];
    }

    getDynamicPages() {
        const ellipsis = { type: PaginationItemTypes.ELLIPSIS };
        if (this._currentPage <= 3) {
            return [
                ...Array.from({ length: 3 }, (_, i) => ({
                    type: PaginationItemTypes.PAGE,
                    index: i + 1,
                })),
                ellipsis,
                { type: PaginationItemTypes.PAGE, index: this._totalPages },
            ];
        } else if (this._currentPage >= this._totalPages - 2) {
            return [
                { type: PaginationItemTypes.PAGE, index: 1 },
                ellipsis,
                { type: PaginationItemTypes.PAGE, index: this._totalPages - 2 },
                { type: PaginationItemTypes.PAGE, index: this._totalPages - 1 },
                { type: PaginationItemTypes.PAGE, index: this._totalPages },
            ];
        } else {
            return [
                { type: PaginationItemTypes.PAGE, index: 1 },
                ellipsis,
                {
                    type: PaginationItemTypes.PAGE,
                    index: this._currentPage - 1,
                },
                { type: PaginationItemTypes.PAGE, index: this._currentPage },
                {
                    type: PaginationItemTypes.PAGE,
                    index: this._currentPage + 1,
                },
                ellipsis,
                { type: PaginationItemTypes.PAGE, index: this._totalPages },
            ];
        }
    }

    render() {
        return `<ul class="fr-pagination__list">
            ${this._items.map((item) => item.render()).join('')}
        </ul>`;
    }
}

export { PaginationList };
