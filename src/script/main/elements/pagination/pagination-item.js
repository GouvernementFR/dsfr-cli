const PaginationItemTypes = {
    FIRST: {
        type: 'first',
        disabledAtMin: true,
    },
    PREV: {
        type: 'prev',
        disabledAtMin: true,
        hasLGLabel: true,
    },
    NEXT: {
        type: 'next',
        disabledAtMax: true,
        hasLGLabel: true,
    },
    LAST: {
        type: 'last',
        disabledAtMax: true,
    },
    PAGE: {
        type: 'page',
    },
    ELLIPSIS: {
        type: 'ellipsis',
    },
};

const PaginationItemPositions = {
    FIRST: 'first',
    LAST: 'last',
};

class PaginationItem {
    constructor(config, index, isCurrentPage = false, position = null) {
        this._typeConfig = config;
        this._index = index;
        this._type = config.type;
        this._isPage = this._type === 'page';
        this._isCurrentPage = isCurrentPage;
        this._position = position;
        this._href = this.setPageHref();
        this._title = `${window.resource?.pagination?.[this._type]} ${this._isPage ? this._index : ''}`;
        this._label = this._isPage ? this._index : this._title;
    }

    setPageHref() {
        const searchUrl = new URL(window.location.href);
        searchUrl.searchParams.set('page', this._index);
        return searchUrl.href;
    }

    getAttributes() {
        const isDisabled =
            (this._position === PaginationItemPositions.FIRST &&
                this._typeConfig.disabledAtMin) ||
            (this._position === PaginationItemPositions.LAST &&
                this._typeConfig.disabledAtMax);
        const classes = ['fr-pagination__link'];
        if (!this._isPage) classes.push(`fr-pagination__link--${this._type}`);
        if (this._typeConfig.hasLGLabel)
            classes.push('fr-pagination__link--lg-label');

        const attributes = {
            href: !this._isCurrentPage ? this._href : null,
            'aria-current': this._isCurrentPage && this._isPage ? 'page' : '',
            class: classes.join(' '),
        };

        if (isDisabled) {
            attributes['aria-disabled'] = 'true';
            attributes.role = 'link';
            attributes.href = null;
        }

        return attributes;
    }

    render() {
        const id = `pagination-${this._type}${this._isPage ? '-' + this._index : ''}`;
        const tag = this._type === PaginationItemTypes.ELLIPSIS.type ? 'span' : 'a';
        const attributes = Object.entries(this.getAttributes())
            .filter(([key, value]) => value !== null && value !== '')
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');

        return `<li>
            <${tag} id="${id}" title="${this._title}" ${attributes}>
                ${this._label}
            </${tag}>
        </li>`;
    }
}

export { PaginationItem, PaginationItemTypes, PaginationItemPositions };
